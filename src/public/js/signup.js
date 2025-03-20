console.log("Signup frontend javascript file");

$(function () {
  const fileTarget = $(".file-box .upload-hidden"); // bu input rasm joylash button yonidagi
  let filename;

  fileTarget.on("change", function () {
    if (window.FileReader) {
      const uploadFile = $(this)[0].files[0];
      const fileType = uploadFile["type"];
      const validImageType = ["image/jpg", "image/jpeg", "image/png"];
      if (!validImageType.includes(fileType)) {
        alert("Please insert only jpeg, jpg and png!");
      } else {
        if (uploadFile) {
          console.log(URL.createObjectURL(uploadFile)); // faylga URL yaratiladi
          $(".upload-img-frame") // va bu URL upload-img-frame elementining src atributiga o‘rnatiladi.
            .attr("src", URL.createObjectURL(uploadFile))
            .addClass("success"); // rasmni ko‘rsatish jarayonida, tasvirni muvaffaqiyatli yuklanganini bildiruvchi klass qo‘shiladi (CSS orqali styling qilish mumkin).
        }
        filename = $(this)[0].files[0].name;
      }
      $(this).siblings(".upload-name").val(filename); // file name upload-name classiga kursatiladi
    }
  });
});

// Form validation mantig'i
function validateSignupForm() {
  const memberNick = $(".member-nick").val();
  const memberPhone = $(".member-phone").val();
  const memberPassword = $(".member-password").val();
  const confirmPassword = $(".confirm-password").val();

  if (
    memberNick === "" ||
    memberPhone === "" ||
    memberPassword === "" ||
    confirmPassword === ""
  ) {
    alert("Please insert all required inputs!");
    return false;
  }

  if (memberPassword !== confirmPassword) {
    alert("Password differs, please check!");
    return false;
  }
  const memberImage = $(".member-image").get(0)?.files[0]?.name
    ? $(".member-image").get(0).files[0].name
    : null;
  if (!memberImage) {
    alert("Please insert restaurant image!");
    return false;
  }
}
