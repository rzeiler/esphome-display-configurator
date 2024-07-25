<template>
  <!--   @click="buildCode"-->
  <div
    id="uieditor"
    class="d-flex align-items-stretch overflow-hidden position-relative vh-100 vw-100"
  >
    <div class="bg-primary-subtle d-flex flex-column m-3 rounded p-2 shadow-sm text">
      <button
        class="btn btn-primary m-2 text-white"
        @click="addLabel"
        data-bs-toggle="tooltip"
        title="Add new Text"
      >
        <span class="mdi mdi-format-text fs-4"></span>
      </button>
      <button
        class="btn btn-primary m-2 text-white"
        @click="addFont = true"
        data-bs-toggle="tooltip"
        title="Add new Font from Google Fonts"
      >
        <span class="mdi mdi-format-font fs-4"></span>
      </button>

      <button
        class="btn btn-primary m-2 text-white"
        @click="newImage"
        data-bs-toggle="tooltip"
        title="Add new Image from pictogrammers"
      >
        <span class="mdi mdi-image fs-4"></span>
      </button>

      <button
        class="btn btn-primary m-2 text-white"
        @click="openFile"
        data-bs-toggle="tooltip"
        title="Datei öffnen"
      >
        <span class="mdi mdi-folder-open-outline fs-4"></span>
      </button>

      <button
        class="btn btn-primary m-2 text-white"
        @click="saveFile"
        data-bs-toggle="tooltip"
        title="Datei Speichern"
      >
        <span class="mdi mdi-content-save-outline fs-4"></span>
      </button>

      <span class="flex-grow-1"> </span>

      <div
        class="btn-group position-relative his"
        data-bs-toggle="tooltip"
        title="history"
        role="group"
      >
        <button
          type="button"
          class="btn btn-primary text-white mdi mdi-arrow-u-left-top"
          data-bs-toggle="tooltip"
          title="back"
          data-bs-placement="bottom"
          @click="stepback()"
        />
        <button
          type="button"
          class="btn btn-primary text-white mdi mdi-arrow-u-right-top"
          data-bs-toggle="tooltip"
          title="forward"
          data-bs-placement="bottom"
          @click="stepforward()"
        />
        <span
          v-html="his.step"
          class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger hisStep"
        />
      </div>

      <a
        href="https://github.com/rzeiler/esphome-display-configurator"
        class="btn btn-primary m-2 text-white"
        ><span class="mdi mdi-github fs-1"></span
      ></a>
    </div>
    <div class="d-flex flex-column mt-3 mb-3" style="min-width: 300px">
      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn btn-primary text-white mdi mdi-screen-rotation"
          data-bs-toggle="tooltip"
          title="Rotate Display"
          data-bs-placement="bottom"
          @click="rotate(settings.rotation)"
        />
        <input
          type="number"
          style="max-width: 100px"
          class="form-control rounded-0"
          data-bs-toggle="tooltip"
          title="Display Width"
          data-bs-placement="bottom"
          v-model="settings.width"
        />
        <input
          type="number"
          style="max-width: 100px"
          data-bs-toggle="tooltip"
          title="Display Height"
          data-bs-placement="bottom"
          class="form-control rounded-0 rounded-end"
          v-model="settings.height"
        />
      </div>

      <display
        :labels="label"
        :images="images"
        :settings="settings"
        @changed="someChanges"
        class="flex-fill"
      />

      <div class="btn-group mt-3" role="group">
        <button
          type="button"
          class="btn btn-light"
          data-bs-toggle="tooltip"
          title="Display Preset"
          data-bs-placement="bottom"
          @click="
            display_preset({
              width: 255,
              height: 122,
              background: '#eeeeee',
              text: '#333333',
              name: 'e-ink',
            })
          "
        >
          E-Ink
        </button>
        <button
          type="button"
          class="btn btn-light"
          data-bs-toggle="tooltip"
          title="Display Preset"
          data-bs-placement="bottom"
          @click="
            display_preset({
              width: 64,
              height: 32,
              background: '#333333',
              text: '#ffffff',
              name: 'oled',
            })
          "
        >
          OLed
        </button>
      </div>
    </div>
    <div class="flex-grow-1 d-flex flex-column overflow-auto">
      <div class="p-4 flex-grow-1">
        <h3>Text</h3>

        <TextItem
          v-for="(text, idx) in label"
          v-model="label[idx]"
          :fonts="fonts"
          :key="text.id"
          @delete="deleteText(text)"
        />

        <h3>Image</h3>

        <ImageItem
          v-for="(image, idx) in images"
          :key="image.id"
          v-model="images[idx]"
          @delete="deleteImage(image)"
        />

        <h3>Font</h3>

        <div class="input-group mb-3" v-for="font in fonts" :key="font.id">
          <span class="input-group-text">{{ font.name }}</span>
          <div class="border">
            <span class="border border-0 rounded-0 position-absolute fs-7 overlay"
              >Size</span
            >
            <input
              type="number"
              class="form-control"
              v-model="font.size"
              @change="changeSize(font)"
            />
          </div>
          <button class="btn btn-danger" style="z-index: unset" @click="removeFont(font)">
            <span class="mdi mdi-trash-can-outline me-1"></span>Remove
          </button>
        </div>
      </div>
    </div>

    <div class="card p-1 m-4 bg-dark text-white shadow">
      <scrollbar class="h-100 w-100 p-2" :settings="scrollbar_settings">
        <pre class="overflow-visible" v-html="code"></pre>
      </scrollbar>
    </div>

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
</template>

<script>
import display from "./display/";
import { TextItem, NewTextItem } from "./text/";
import { ImageItem, NewImageItem } from "./image/";
import { OpenFile, SaveFile } from "./file/";
import scrollbar from "./Scrollbar";

export default {
  name: "UiEditor",
  components: {
    display,
    TextItem,
    ImageItem,
    scrollbar,
  },
  data: function () {
    return {
      label: [],
      fonts: [],
      choosFont: null,
      addFont: false,
      fontData: { name: "", size: 10 },
      code: "",
      images: [],
      settings: {
        height: 122,
        width: 255,
        background: "#eeeeee",
        text: "#333333",
        rotation: 0,
      },
      allowSave: false,
      scrollbar_settings: {
        suppressScrollY: false,
        suppressScrollX: false,
        wheelSpeed: 1,
        wheelPropagation: true,
        minScrollbarLength: 50,
      },
      his: {
        data: [],
        step: 1,
        max: 1,
      },
    };
  },
  mounted() {
    this.allowSave = false;
    if (localStorage.history != undefined && localStorage.history != "undefined") {
      this.his.data = JSON.parse(localStorage.history);

      this.reset();
    } else {
      this.fontData = { name: "Dosis", size: 15 };
      this.addNewFont();
      this.addLabel();
      this.newImage();
    }
  },
  updated: function () {
    this.allowSave = true;
  },

  methods: {
    stepforward() {
      this.his.step++;
      this.reset();
    },
    stepback() {
      this.his.step--;
      this.reset();
    },
    display_preset(data) {
      // width, height, background, text
      this.settings.width = data.width;
      this.settings.height = data.height;
      this.settings.background = data.background;
      this.settings.text = data.text;
    },
    reset() {
      //let lastsettings = this.his.data[this.his.data.length - 1];
      let lastsettings = this.his.data[this.his.step - 1];
      this.label = lastsettings.label;
      this.fonts = lastsettings.fonts;
      this.images = lastsettings.images;
      this.settings = lastsettings.settings;

      this.fonts.forEach((font) => {
        let file = document.createElement("link");
        file.id = font.id;
        file.rel = "stylesheet";
        file.href = `https://fonts.googleapis.com/css2?family=${font.name}`;
        document.head.appendChild(file);
      });
    },
    someChanges(a) {
      this.buildCode();
    },
    deleteText(txt) {
      this.label = this.label.filter((obj) => {
        return obj !== txt;
      });
    },
    deleteImage(img) {
      this.images = this.images.filter((obj) => {
        return obj !== img;
      });
    },
    newImage() {
      this.images.push(NewImageItem(this.images.length));
    },
    openFile() {
      OpenFile().then(
        (data) => {
          const history = JSON.parse(data);

          this.his.data.push(history);

          this.reset();

          this.buildCode();
        },
        (stop) => console.log(stop)
      );
    },
    saveFile() {
      const content = JSON.stringify(this.his.data[this.his.data.length - 1]);
      SaveFile(content).then(
        (ok) => console.log(ok),
        (stop) => console.log(stop)
      );
    },
    rotate(rotation) {
      rotation += 90;
      if (rotation > 270) {
        rotation = 0;
      }
      var h = this.settings.height;
      var w = this.settings.width;
      this.settings.height = w;
      this.settings.width = h;
      this.settings.rotation = rotation;
    },

    changeSize(item) {
      this.label.forEach((obj) => {
        if (obj.font.id == item.id) {
          obj.font.size = item.size;
        }
      });
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

      this.code = `# Example configuration entry Images `;
      this.code += "\nimages:";
      this.images.forEach((i) => {
        this.code += `\n  - file: "${i.image}"`;
        this.code += `\n    id: image${i.id}`;
        this.code += `\n    size: 24x24`;
      });

      this.code += `\n\n# Example configuration entry Font `;
      this.code += "\nfont:";
      this.fonts.forEach((i) => {
        this.code += `\n  - file: "gfonts://${i.name}"`;
        this.code += `\n    id: ${i.id}`;
        this.code += `\n    size: ${i.size}`;
      });
      this.code += `\n\n# Example configuration entry Display `;
      this.code += `\ndisplay:`;
      this.code += `\n    rotation: ${this.settings.rotation}`;
      this.code += `\n    lambda: |-`;
      this.label.forEach((i) => {
        this.code += `\n      it.printf(${i.left},${i.top}, id(${i.font.id}), TextAlign::${i.style}, "%s", "${i.text}");`;
      });
      this.images.forEach((i) => {
        this.code += `\n      it.image(${i.left},${i.top}, id(image${i.id}), ImageAlign::TOP_LEFT);`;
      });

      if (this.allowSave) {
        console.log("allowSave write");

        const newSettings = {
          time: `${day}.${month} / ${hours}:${minutes}.`,
          label: this.label,
          fonts: this.fonts,
          images: this.images,
          settings: this.settings,
        };

        this.his.data.push(newSettings);
        localStorage.history = JSON.stringify(this.his.data);
      }
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
    },
    remove(index) {
      this.label = this.label.filter((obj) => {
        return obj.id !== index;
      });
    },
    addLabel() {
      this.label.push(NewTextItem(this.fonts[0], this.label.length));
    },
  },
  watch: {
    "settings.rotation"(newVal, oldVal) {
      this.buildCode();
    },
    "settings.width"(newVal, oldVal) {
      this.buildCode();
    },
    "settings.height"(newVal, oldVal) {
      this.buildCode();
    },
    label(newVal, oldVal) {
      this.buildCode();
    },
    images(newVal, oldVal) {
      this.buildCode();
    },
    "his.data"() {
      this.his.step = this.his.data.length;
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

.his:hover .hisStep {
  opacity: 1;
}

.hisStep {
  z-index: 2;
  opacity: 0.5;
  transition: all 0.2s ease-in-out;
}
</style>
