// size corresond small mobile (320x480), tablet (768x1024) and desktop (1440x900)
const sizes = ["iphone-3", "ipad-2", "macbook-15"];

describe("viewport demo", () => {
  sizes.forEach(size => {
    beforeEach(() => {
      cy.viewport(size);
    });
    // to confirm if working
    it("fits screen", () => {
      cy.check(window.innerHeight, cy.viewport().innerHeight);
    });
  });
});
