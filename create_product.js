$(document).ready(function () {
  $("#product-form").submit(function (event) {
    event.preventDefault(); 

    const formData = new FormData(this);

    $.ajax({
      url: 'https://mail.google.com', 
      method: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function (response) {
      
        $("#product-name").val("");
        $("#product-price").val("");
        $("#product-image").val("");
        $("#email").val("");
        $("#add").val("");

        // แสดง popup ของอีเมล
        $("#email-popup-message").text(response.emailMessage);
        $("#email-popup").show();

        // แสดง popup ของ MongoDB
        $("#mongo-popup-message").text(response.mongoMessage);
        $("#mongo-popup").show();
      },
      error: function () {
        alert("An error occurred while adding the product!");
      },
    });
  });

  // ปิด popup เมื่อคลิกปุ่มปิด
  $("#close-email-popup").click(function () {
    $("#email-popup").hide();
  });

  $("#close-mongo-popup").click(function () {
    $("#mongo-popup").hide();
  });
});
