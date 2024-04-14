$(document).ready(function() {
    $('#taxForm').submit(function(e) {
      e.preventDefault();
  
      // Reset error styles
      $('.error-icon').hide();
      $('input, select').removeClass('is-invalid');
  
      // Check for mandatory fields
      var age = $('#age').val();
      var income = $('#income').val();
      if (!age || !income) {
        $('.error-icon').show();
        if (!age) $('#age').addClass('is-invalid');
        if (!income) $('#income').addClass('is-invalid');
        return;
      }
  
      // Perform tax calculation
      var taxRate = 0;
      var ageGroup = $('#age').val();
      var grossIncome = parseFloat($('#income').val());
      var extraIncome = parseFloat($('#extraIncome').val()) || 0;
      var deductions = parseFloat($('#deductions').val()) || 0;
      var totalIncome = grossIncome + extraIncome - deductions;
      var taxAmount = 0;
  
      if (totalIncome > 800000) {
        if (ageGroup == '<40') {
          taxRate = 0.3;
        } else if (ageGroup == '>=40&<60') {
          taxRate = 0.4;
        } else if (ageGroup == '>=60') {
          taxRate = 0.1;
        }
  
        taxAmount = (totalIncome - 800000) * taxRate;
      }
  
      // Display result in modal
      var modalBody = '<p>Total Income: ' + totalIncome.toFixed(2) + ' Lakhs</p>';
      modalBody += '<p>Tax Amount: ' + taxAmount.toFixed(2) + ' Lakhs</p>';
      $('#modalBody').html(modalBody);
      $('#resultModal').modal('show');
    });
  
    // Show error tooltip on hover
    $('.error-icon').hover(function() {
      $(this).tooltip({
        title: 'This field is required',
        placement: 'left'
      });
      $(this).tooltip('show');
    });
  });

  $(document).ready(function() {
    // Show error icon on input blur if invalid
    $('input').blur(function() {
      var isValid = this.checkValidity();
      if (!isValid) {
        $(this).siblings('.error-icon').show();
      } else {
        $(this).siblings('.error-icon').hide();
      }
    });
  
    // Show tooltip with error message on error icon hover
    $('.error-icon').hover(function() {
      var errorMessage = $(this).siblings('input')[0].validationMessage;
      $(this).tooltip({
        title: errorMessage,
        placement: 'right'
      });
      $(this).tooltip('show');
    });
  
    // Hide error icon on input focus
    $('input').focus(function() {
      $(this).siblings('.error-icon').hide();
    });
  
    // Form submission and validation
    $('#taxForm').submit(function(e) {
      e.preventDefault();
      var form = $(this)[0];
      if (form.checkValidity()) {
        // Form is valid, proceed with calculation
        calculateTax();
      } else {
        // Form is invalid, display validation messages
        $(this).addClass('was-validated');
      }
    });
  
    // Tax calculation function
    function calculateTax() {
      // Add your tax calculation logic here
      console.log('Tax calculation function');
    }
  });
  
  