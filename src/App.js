console.log("app is running!");

class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    // 다크모드 관련 기능
    const $body = document.querySelector("body");
    const mode = storage.get("mode");
    this.darkmodeCheckbox = new DarkmodeCheckbox({
      $target,
      changeMode: (checked) => {
        if (checked) {
          storage.set("mode", "dark");
        } else {
          storage.set("mode", "light");
        }

        // 모드 설정
        $body.classList = storage.get("mode");
      },
    });
    if (mode) {
      $body.classList = mode;
      if (mode === "dark") {
        this.darkmodeCheckbox.$button.checked = true;
      }
    }

    this.searchInput = new SearchInput({
      $target,
      onSearch: (keyword) => {
        new Loading($target);
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
        this.searchKeywords.setState(keyword);
      },
    });
    if (!storage.get("keywords")) {
      this.searchInput.$searchInput.focus();
    }

    this.searchKeywords = new SearchKeywords({
      $target,
      onClick: (e) => {
        if (e.target !== this.searchKeywords.$container) {
          const keyword = e.target.innerText;
          this.searchInput.onSearch(keyword);
          // 키워드 누를 시 검색 input 초기화
          this.searchInput.$searchInput.value = "";
        }
      },
    });
    const keywords = storage.get("keywords");
    if (keywords) {
      const keyword = keywords[keywords.length - 1];
      this.searchInput.onSearch(keyword);
      this.searchInput.$searchInput.value = keyword;
    }

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
