export default class Banner {
  $banner = null;
  data = [];
  currentIndex = 0;

  constructor({ $target, onRandomSearch }) {
    this.$banner = document.createElement("section");
    this.$banner.className = "Banner";

    this.$banner.addEventListener("click", (e) => {
      if (e.target.className === "LeftButton") {
        this.currentIndex === 0 ? 0 : (this.currentIndex -= 1);
      } else if (e.target.className === "RightButton") {
        this.currentIndex =
          this.currentIndex === 4 ? 4 : (this.currentIndex += 1);
      }
      this.render();
    });

    $target.appendChild(this.$banner);

    document.addEventListener("DOMContentLoaded", () => {
      onRandomSearch();
    });
  }

  setState(nextData) {
    this.data = nextData.slice(0, 6);
    this.render();
  }

  render() {
    const image = this.data[this.currentIndex];
    this.$banner.innerHTML = `
        <button class="LeftButton">⬅</button>
        <article class="BannerItem">
            <img src="${image.url}" alt="${image.name}" />
        </article>
        <button class="RightButton">➡</button>
    `;
  }
}
