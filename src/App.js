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
        api.fetchCats(keyword).then(({ data }) => this.setState(data));
      },
    });
    this.searchInput.$searchInput.focus();

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async (image) => {
        const details = await api.fetchCatDetails(image.id);

        this.imageInfo.setState({
          visible: true,
          image: details.data,
        });
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

  setState(nextData) {
    console.log(this);
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
