import TextItem from './index.vue'
import { ListAlign } from "../align.js";

const NewTextItem = (font, id) => {
    return {
        top: 0,
        left: 0,
        text: "Hello World",
        //id: id,
        font: font,
        style: ListAlign[0],
        id: `txt${id}`
    }
};

export {
    TextItem,
    NewTextItem
}