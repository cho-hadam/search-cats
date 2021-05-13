class DarkmodeCheckbox {
  $button = null;

  constructor({ $target, changeMode }) {
    const button = document.createElement("input");
    button.type = "checkbox";
    this.$button = button;

    this.$button.className = "DarkmodeCheckbox";
    $target.appendChild(this.$button);

    this.$button.addEventListener("change", (e) => {
      changeMode(e.target.checked);
    });
  }
}
