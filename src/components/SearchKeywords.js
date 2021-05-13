import storage from "../utils/storage.js";

export default class SearchKeywords {
  $container = null;
  keywords = [];
  onClick = null;

  constructor({ $target, onClick }) {
    this.$container = document.createElement("div");
    this.$container.className = "KeywordsContainer";

    this.$container.addEventListener("click", onClick);

    $target.appendChild(this.$container);
  }

  setState(nextData) {
    this.keywords = storage.get("keywords") || [];

    // 키워드가 있었을 경우 최신으로만 변경
    if (this.keywords.includes(nextData)) {
      this.keywords.splice(this.keywords.indexOf(nextData), 1);
    }
    this.keywords = [...this.keywords, nextData];
    // 5개 키워드 유지
    if (this.keywords.length > 5) {
      this.keywords.shift();
    }

    storage.set("keywords", this.keywords);

    this.render();
  }

  render() {
    this.$container.innerHTML = this.keywords
      .reverse()
      .map((keyword) => `<div class="Keyword">${keyword}</div>`)
      .join("");
  }
}
