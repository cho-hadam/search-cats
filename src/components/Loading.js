export default class Loading {
  $container = null;

  constructor($target) {
    this.$container = document.createElement("div");
    this.$container.className = "LoadingContainer";
    this.$container.innerHTML = `<span>Loading...</span>`;

    $target.appendChild(this.$container);
  }
}
