/**
 * This Makes the Decision on how much loan should the company be alloted.
 * @param {Array} businessDetails 
 * @param {Int} preAssessmentValue 
 * @returns 
 */
function loanApplicationDecision(businessDetails, preAssessmentValue)
{
    const loanAmountAllowed = (businessDetails.loanAmount * preAssessmentValue) / 100;
    const messageToBeSent = "Your Company by the name "+businessDetails.companyName+", which is established in the year "+businessDetails.yearEstablished+" is alloted a loan amount of "+loanAmountAllowed;

    return {message:messageToBeSent};
}
module.exports = {
    loanApplicationDecision
};