import { CompletionForcast, ICompletionForcast } from "../components/CompletionForcast";

describe('CompletionForcast tests',()=>{
    it('renders CompletionForcast',()=>{
        const mockProps:ICompletionForcast = {
            forcast:'2',
            buttonColor:'dark',
            toggleHelpTips:false
        };


        cy.mount(<CompletionForcast {...mockProps}/>)

           cy.get('[data-cy="forcast"]').should('exist');
           cy.get('[data-cy="forcast"]').should('have.text', "At this rate, you'll finish your todos in:2sessions");
           cy.get('[data-cy="forcast"]').should('have.css', 'color', 'rgb(0, 0, 0)')

          
    })
})