$(document).ready(function () {
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("close-popup");

  closePopup.addEventListener("click", function () {
      popup.style.display = "none";
  });

  window.addEventListener("click", function (event) {
      if (event.target === popup) {
          popup.style.display = "none";
      }
  });

  $("#contact-button").click(function () {
      const name = $("#name").val();
      const email = $("#email").val();
      const message = $("#message").val();

      const data = {
          name: name,
          email: email,
          message: message,
      };

      // เปลี่ยน URL ให้เป็น URL ของเซิร์ฟเวอร์หรือบริการส่งอีเมลของคุณ
      $.ajax({
          url: "https://mail.google.com",
          method: "POST",
          data: JSON.stringify(data),
          contentType: "application/json",
          success: function (response) {
              $("#name").val("");
              $("#email").val("");
              $("#message").val("");
              popup.style.display = "block";
              $("#popup-message").text(response.message);
          },
          error: function () {
              alert("An error occurred while sending the message.");
          },
      });
  });
});
