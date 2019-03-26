describe('Filepond simple upload test', function() {
  beforeEach(function() {
    cy.visit('/');
	});

  it('works with drag-n-drop"', function() {
    cy.fixture('filepond-logo.png').then(fileContent => {
      cy.get('.filepond--root').upload(
        {
          fileContent,
          fileName: 'filepond-logo.png',
          mimeType: 'application/json'
        },
        { subjectType: 'drag-n-drop' }
      );
		});
		
		cy.get('.filepond--file-wrapper').should(($filewrapper) => {
			expect($filewrapper).to.have.length(1);
			expect($filewrapper.first()).to.contain('filepond-logo.png');
		});
		cy.get('.filepond--file').should($file => {
			expect($file).to.have.length(1);
			expect($file.first()).to.contain('13 KB');
		}).within(() => {
			cy.get('.filepond--file-action-button').should($actionbuttons => {
				expect($actionbuttons).to.have.length(3);
			});
			cy.get('.filepond--action-abort-item-load').should('have.attr', 'title', 'Abort');
			cy.get('.filepond--action-retry-item-load').should('have.attr', 'title', 'Retry');
			cy.get('.filepond--action-remove-item').should('have.attr', 'title', 'Remove');
		});
  });
});
