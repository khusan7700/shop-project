console.log("Users frontend javascript file");

$(function () {
  $(".member-status").on("change", function (e) {
    const id = e.target.id;
    console.log("ID:", id);
    const memberStatus = $(`#${id}.member-status`).val();
    console.log("memberStatus:", memberStatus);

    // TODO: axios update Chosen User
    axios
      .post("/admin/user/edit", {
        _id: id,
        memberStatus: memberStatus,
      })
      .then((response) => {
        console.log("response:", response);
        const result = response.data;

        if (result.data) {
          console.log("USER UPDATED!");
          $(".member-status").blur();
        }
      })
      .catch((err) => {
        console.log(err);
        alert("User update failed!");
      });
  });
});
