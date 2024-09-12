const request = require('supertest');
const express = require('express');
const app = require('../app');
const { expect } = require('chai');

describe('GET /', () => {
    it('should return the home page', (done) => {
        request(app)
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});

describe('POST /addBook', () => {
    it('should add a book', (done) => {
        request(app)
            .post('/addBook')
            .send({
                bookName: 'Test Book',
                bookAuthor: 'Test Author',
                bookGenre: 'Test Genre'
            })
            .expect('Location', '/addBook')
            .expect(302, done); // Redirects after adding a book
    });
});

describe('GET /editBook/:id', () => {
    it('should show the edit page for a book', (done) => {
        request(app)
            .get('/editBook/1') // Use an actual ID that exists in your database
            .expect('Content-Type', /html/)
            .expect(200, done);
    });
});

describe('POST /editBook/:id', () => {
    it('should update a book', (done) => {
        request(app)
            .post('/editBook/1') // Use an actual ID that exists in your database
            .send({
                newBookName: 'Updated Book Name',
                newBookAuthor: 'Updated Author',
                newBookGenre: 'Updated Genre'
            })
            .expect('Location', '/addBook')
            .expect(302, done); // Redirects after updating a book
    });
});

describe('GET /addBook/:id', () => {
    it('should delete a book', (done) => {
        request(app)
            .get('/addBook/1') // Use an actual ID that exists in your database
            .expect('Location', '/addBook')
            .expect(302, done); // Redirects after deleting a book
    });
});
