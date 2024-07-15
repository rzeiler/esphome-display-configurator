<template>
  <div
    id="uieditor"
    @click="buildCode"
    class="d-flex align-items-stretch overflow-hidden position-relative"
  >
    <div class="bg-primary-subtle d-flex flex-column m-3 rounded p-2 shadow-sm">
      <button
        class="btn btn-primary m-2 text-white"
        @click="addLabel"
        data-bs-toggle="tooltip"
        title="Add new Text"
      >
        <span class="mdi mdi-format-text fs-5"></span>
      </button>
      <button
        class="btn btn-primary m-2 text-white"
        @click="addFont = true"
        data-bs-toggle="tooltip"
        title="Add new Font from Google Fonts"
      >
        <span class="mdi mdi-format-font fs-5"></span>
      </button>

      <button
        class="btn btn-primary m-2 text-white"
        @click="chooseImage = true"
        data-bs-toggle="tooltip"
        title="Add new Image from pictogrammers"
      >
        <span class="mdi mdi-image"></span>
      </button>
      <!-- v-if="chooseImage" -->

      <span class="flex-grow-1"> </span>

      <button class="d-none btn btn-primary m-2 text-white position-relative">
        <span class="mdi mdi-refresh fs-5"></span>
        <span
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger p-1"
          >{{ history }}<span class="visually-hidden">history</span></span
        >
      </button>

      <a
        href="https://github.com/rzeiler/esphome-display-configurator"
        class="btn btn-primary m-2 text-white"
        ><span class="mdi mdi-github fs-1"></span
      ></a>
    </div>

    <display :labels="label"></display>

    <div class="d-flex flex-column flex-grow-1">
      <div class="flex-grow-1 d-flex flex-column overflow-auto">
        <div class="p-4 flex-grow-1">
          <h3>Text</h3>

          <div class="card mb-2 p-2 shadow-sm">
            <b-label
              v-for="(item, idx) in label"
              v-model="label[idx]"
              :fonts="fonts"
              :key="idx"
            ></b-label>
          </div>

          <h3>Image</h3>

          <imageSetting
            v-for="image in images"
            :key="image.id"
            :image="image.image"
            :top="image.top"
            :left="image.left"
          />

          <h3>Font</h3>
          <div class="card mb-2 p-2 shadow-sm">
            <div class="input-group mb-3" v-for="font in fonts" :key="font.id">
              <span class="input-group-text">{{ font.name }}</span>
              <input
                type="number"
                class="form-control"
                v-model="font.size"
                @change="changeSize(font)"
              />
              <button
                class="btn btn-danger"
                style="z-index: unset"
                @click="removeFont(font)"
              >
                <span class="mdi mdi-trash-can-outline me-1"></span>Remove
              </button>
            </div>
          </div>
        </div>
      </div>
      <pre class="card p-4 bg-dark text-white m-4 shadow" v-html="code"></pre>
      <div
        v-if="choosFont"
        @click="choosFont = false"
        class="position-absolute d-flex justify-content-center align-items-center top-0 start-0 vh-100 vw-100 bg-body-secondary"
        style="--bs-bg-opacity: 0.5"
      >
        <div class="list-group">
          <button
            type="button"
            v-for="font in fonts"
            :key="font.id"
            class="list-group-item list-group-item-action"
            @click="changeFont(font)"
          >
            {{ font.name }} ({{ font.size }})
          </button>
        </div>
      </div>
      <div
        v-if="addFont"
        class="position-absolute d-flex justify-content-center align-items-center top-0 start-0 vh-100 vw-100 bg-body-secondary"
        style="--bs-bg-opacity: 0.5"
      >
        <div class="bg-white shadow p-0 rounded">
          <button
            type="button"
            class="btn-close m-1"
            @click="addFont = false"
            aria-label="Close"
            style="float: right"
          ></button>

          <div class="input-group m-4" style="width: 700px">
            <span class="input-group-text">Google Font</span>
            <input
              type="text"
              class="form-control"
              v-model="fontData.name"
              placeholder="Roboto, Montserrat, Raleway,Open Sans..."
              aria-label="Text"
              aria-describedby="Text"
            />
            <span class="input-group-text">Size</span>
            <input
              type="number"
              class="form-control"
              v-model="fontData.size"
              value="10"
              min="0"
              max="30"
            />
            <button class="btn btn-danger" style="z-index: unset" @click="addNewFont">
              <span class="mdi mdi-check me-1"></span>Add
            </button>
          </div>
        </div>
      </div>
    </div>
    <add_image v-if="chooseImage"></add_image>
  </div>
</template>

<script>
import display from "./Display.vue";
import bLabel from "./LabelSetting.vue";
import add_image from "./image/add/";
import imageSetting from "./image/setting/";

export default {
  name: "UiEditor",
  components: {
    display,
    "b-label": bLabel,
    add_image,
    imageSetting,
  },
  data: function () {
    return {
      label: [],
      fonts: [],
      choosFont: null,
      chooseImage: false,
      addFont: false,
      fontData: { name: "", size: 10 },
      code: "",
      history: 0,
      images: [],
    };
  },
  mounted() {
    if (localStorage.history != undefined) {
      let lastsettings = JSON.parse(localStorage.history);
      this.label = lastsettings.label;
      this.fonts = lastsettings.fonts;

      this.fonts.forEach((font) => {
        let file = document.createElement("link");
        file.id = font.id;
        file.rel = "stylesheet";
        file.href = `https://fonts.googleapis.com/css2?family=${font.name}`;
        document.head.appendChild(file);
      });

      this.buildCode();
    } else {
      this.fontData = { name: "Dosis", size: 15 };
      this.addNewFont();
      this.addLabel();
    }

    this.setTooltip();
  },
  methods: {
    onChange(e) {
      console.log(e);
    },
    textAlign(item) {
      console.log(item);
    },
    changeSize(item) {
      this.label.forEach((obj) => {
        console.log(obj.font.id, item.id);
        if (obj.font.id == item.id) {
          obj.font.size = item.size;
        }
      });
    },
    setDisplay(d) {
      this.display = d;
      console.log("change display", d);
    },
    setHistory(n) {
      alert("set hist");
      console.log(n);
    },
    changeFont(font) {
      this.choosFont.font = font;
      this.choosFont = null;
    },
    removeFont(font) {
      this.fonts = this.fonts.filter((obj) => {
        return obj !== font;
      });
    },
    buildCode() {
      const now = new Date();
      const day = now.getDate();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const month = now.getMonth();

      this.code = `# Example configuration entry Font `;
      this.code += "\nfont:";
      this.fonts.forEach((i) => {
        this.code += `\n  - file: "gfonts://${i.name}"`;
        this.code += `\n    id: ${i.id}`;
        this.code += `\n    size: ${i.size}`;
      });
      this.code += `\n\n# Example configuration entry Display `;
      this.code += `\ndisplay:`;
      this.code += `\n    lambda: |-`;
      this.label.forEach((i) => {
        this.code += `\n      it.printf(${i.left},${i.top}, id(${i.font.id}), TextAlign::${i.style}, "${i.text}");`;
      });

      localStorage.history = JSON.stringify({
        title: "",
        text: "",
        time: `${day}.${month} / ${hours}:${minutes}.`,
        label: this.label,
        fonts: this.fonts,
      });
    },
    addNewFont() {
      this.fonts.push({
        name: this.fontData.name,
        size: this.fontData.size,
        id: "font" + this.fonts.length,
      });
      let font = this.fonts[this.fonts.length - 1];

      let file = document.createElement("link");
      file.id = font.id;
      file.rel = "stylesheet";
      file.href = `https://fonts.googleapis.com/css2?family=${font.name}`;
      document.head.appendChild(file);

      this.buildCode();
    },

    remove(index) {
      this.label = this.label.filter((obj) => {
        return obj.id !== index;
      });
    },
    addLabel() {
      this.label.push({
        top: 0,
        left: 0,
        text: "Hello World",
        id: this.label.length,
        font: this.fonts[0],
      });
      this.buildCode();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#uieditor {
  width: 100vw;
  height: 100vh;
}

#display {
  position: relative;
  border: 3px solid #000000;
  background-color: #000000;
  box-shadow: 0px 0px 10px #000000;
  width: 128px;
  height: 64px;
}

.board {
  display: inline-block;
  border: 5px solid #1b497e;
  background-color: #17599b;
  padding: 20px 10px 30px 10px;
  border-radius: 7px;
  margin: 100px;
}

label {
  user-select: none;
  position: absolute;
  color: #fff;
}

.hole {
  border: 2px solid #aaa;
  height: 12px;
  width: 12px;
  background-color: rgba(var(--bs-tertiary-bg-rgb), var(--bs-bg-opacity)) !important;
}

.line {
  background-color: red;
}
</style>
