const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement("input");
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = "고양이를 검색해보세요.|";

    $searchInput.className = "SearchInput";
    $target.appendChild($searchInput);

    $searchInput.addEventListener("keyup", (e) => {
      // Enter
      if (e.keyCode === 13) {
        onSearch(e.target.value);
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
