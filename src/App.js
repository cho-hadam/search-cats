console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.darkmodeCheckbox = new DarkmodeCheckbox({
      $target,
      changeMode: (checked) => {
        const $body = document.querySelector("body");
        if (checked) {
          $body.className = "dark";
        } else {
          $body.className = "light";
        }
      },
    });

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        new Loading($target);
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
        this.searchKeywords.setState(keyword);
      },
    });
    this.searchInput.$searchInput.focus();

    this.searchKeywords = new SearchKeywords({
      $target,
      onClick: (e) => {
        const keyword = e.target.innerText;
        this.searchInput.onSearch(keyword);
        // 키워드 누를 시 검색 input 초기화
        this.searchInput.$searchInput.value = "";
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        new Loading($target);
        const details = await api.fetchCatDetails(image.id);

        this.imageInfo.setState({
          visible: true,
          image: details.data,
        });

        this.finishLoading();
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });
  }

  finishLoading() {
    this.$target.removeChild(document.querySelector(".LoadingContainer"));
  }

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
    // 로딩 종료
    this.finishLoading();
  }
}
