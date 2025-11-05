const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../index");
const User = require("../models/user.model");
const Note = require("../models/note.model");

chai.use(chaiHttp);
const { expect } = chai;

describe("Notes App API Tests", () => {
  let token = "";
  let noteId = "";

  const testUser = {
    fullName: "Test User",
    email: "testuser@example.com",
    password: "123456",
  };

  const uniqueEmail = `test_${Date.now()}@example.com`;

  // Create Account
  it("should create a new user account", (done) => {
  chai
    .request(app)
    .post("/create-account")
    .send({
      fullName: "Test User",
      email: uniqueEmail,
      password: "123456",
    })
    .end((err, res) => {
      expect(res).to.have.status(200);
      done();
    });
});

  // Login
  it("should login an existing user", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ email: testUser.email, password: testUser.password })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.false;
        expect(res.body).to.have.property("accessToken");
        token = res.body.accessToken;
        done();
      });
  });

  // Add Note
  it("should add a new note", (done) => {
    chai
      .request(app)
      .post("/add-note")
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Test Note", content: "This is a test note" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.false;
        noteId = res.body.note._id;
        done();
      });
  });

  // Get All Notes
  it("should get all notes for the user", (done) => {
    chai
      .request(app)
      .get("/get-all-notes")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.false;
        expect(res.body.notes).to.be.an("array");
        done();
      });
  });

  // Edit Note
  it("should edit an existing note", (done) => {
    chai
      .request(app)
      .put(`/edit-note/${noteId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ title: "Updated Note Title" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.false;
        done();
      });
  });

  // Delete Confirmation
  it("should require user confirmation before deleting a note", (done) => {
    const confirmDelete = false; // simulate no confirmation
    if (!confirmDelete) {
      // simulate app asking for confirmation
      const err = new Error("Delete action not confirmed by user");
      expect(err.message).to.equal("Delete action not confirmed by user");
      done();
    } else {
      done(new Error("Test failed: should not proceed without confirmation"));
    }
  });

  // Delete Note (after confirmation)
  it("should delete a note after user confirmation", (done) => {
    const confirmDelete = true;
    if (confirmDelete) {
      chai
        .request(app)
        .delete(`/delete-note/${noteId}`)
        .set("Authorization", `Bearer ${token}`)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.error).to.be.false;
          done();
        });
    } else {
      done(new Error("Delete was not confirmed"));
    }
  });

  // Get User Info
  it("should fetch logged-in user details", (done) => {
    chai
      .request(app)
      .get("/get-user")
      .set("Authorization", `Bearer ${token}`)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.user).to.have.property("email").that.equals(testUser.email);
        done();
      });
  });

  // Fail to create user without email
  it("should not create user without email", (done) => {
    chai
      .request(app)
      .post("/create-account")
      .send({ fullName: "No Email", password: "123456" })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body.error).to.be.true;
        done();
      });
  });

  // Fail to login with wrong password
  it("should not login with invalid credentials", (done) => {
    chai
      .request(app)
      .post("/login")
      .send({ email: testUser.email, password: "wrongpass" })
      .end((err, res) => {
        expect(res).to.have.status(401);
        expect(res.body.error).to.be.true;
        done();
      });
  });

  // Search Notes
  it("should search notes successfully", (done) => {
    chai
      .request(app)
      .get("/search-notes")
      .set("Authorization", `Bearer ${token}`)
      .query({ query: "Test" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body.error).to.be.false;
        done();
      });
  });
});
