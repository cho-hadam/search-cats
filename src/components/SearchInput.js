const TEMPLATE = '<input type="text">';

export default class SearchInput {
  $searchInput = null;
  $searchButton = null;
  onSearch = null;

  constructor({ $target, onSearch, onRandomSearch }) {
    const $searchContainer = document.createElement("header");
    $searchContainer.className = "SearchContainer";

    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";
    $searchInput.className = "SearchInput";
    $searchContainer.appendChild(this.$searchInput);

    const $searchButton = document.createElement("button");
    $searchButton.className = "SearchButton";
    $searchButton.innerText = "랜덤";
    this.$searchButton = $searchButton;
    this.$searchButton.addEventListener("click", onRandomSearch);
    $searchContainer.appendChild(this.$searchButton);

    $target.appendChild($searchContainer);

    this.onSearch = onSearch;
    $searchInput.addEventListener("keyup", (e) => {
      // Enter
      if (e.keyCode === 13) {
        this.onSearch(e.target.value);
      }
    });

    // 기존 입력 키워드 삭제
    $searchInput.addEventListener("focus", (e) => {
      if (e.target.value !== "") {
        e.target.value = "";
      }
    });

    console.log("SearchInput created.", this);
  }

  render() {}
}
