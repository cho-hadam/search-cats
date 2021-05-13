class SearchKeywords {
  $container = null;
  keywords = [];
  onClick = null;

  constructor({ $target, onClick }) {
    this.$container = document.createElement("div");
    this.$container.className = "KeywordsContainer";

    $target.appendChild(this.$container);

    this.onClick = onClick;
  }

  setState(nextData) {
    // 키워드가 있었을 경우 최신으로만 변경
    if (this.keywords.includes(nextData)) {
      this.keywords.splice(this.keywords.indexOf(nextData), 1);
    }
    this.keywords = [...this.keywords, nextData];
    // 5개 키워드 유지
    if (this.keywords.length > 5) {
      this.keywords.shift();
    }
    this.render();
  }

  render() {
    this.$container.innerHTML = this.keywords
      .map((keyword) => `<div class="Keyword">${keyword}</div>`)
      .join("");

    const $keyword = document.querySelector(".Keyword");
    $keyword.addEventListener("click", this.onClick);
  }
}
