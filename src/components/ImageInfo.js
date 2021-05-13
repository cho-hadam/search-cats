class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement("div");
    $imageInfo.className = "ImageInfo";
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    // 모달 영역 밖 클릭 시 닫힘
    $imageInfo.addEventListener("click", (e) => {
      if (e.target === $imageInfo) {
        this.closeModal();
      }
    });

    // ESC 누를 시 모달 닫힘
    document.addEventListener("keydown", (e) => {
      // ESC
      if (e.keyCode === 27) {
        this.closeModal();
      }
    });

    this.data = data;

    this.render();
  }

  closeModal() {
    this.setState({
      visible: false,
      image: null,
    });
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data.visible) {
      const { name, url, temperament, origin } = this.data.image;

      this.$imageInfo.innerHTML = `
            <div class="content-wrapper">
                <div class="title">
                    <span>${name}</span>
                    <div class="close">x</div>
                </div>
                <img src="${url}" alt="${name}" />
                <div class="description">
                    <div>성격: ${temperament}</div>
                    <div>태생: ${origin}</div>
                </div>
            </div>
          `;

      // X 버튼 클릭 시 모달 닫힘
      const $close = document.querySelector(".close");
      $close.addEventListener("click", (e) => {
        this.closeModal();
      });

      this.$imageInfo.style.display = "block";
    } else {
      this.$imageInfo.style.display = "none";
    }
  }
}
