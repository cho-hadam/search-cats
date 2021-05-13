export default class SearchResult {
  $searchResult = null;
  data = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement("section");
    this.$searchResult.className = "SearchResult";
    $target.appendChild(this.$searchResult);

    this.data = initialData;

    this.$searchResult.addEventListener("click", onClick);

    // this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (!this.data || this.data.length === 0) {
      this.$searchResult.innerHTML = `검색 결과가 없습니다.`;
    } else {
      this.$searchResult.innerHTML = this.data
        .map(
          (cat, index) => `
            <article id="${index}" class="item">
                <img src=${cat.url} alt=${cat.name} />
                <span class="Tooltip">${cat.name}</span>
            </article>
        `
        )
        .join("");
    }
  }
}
