import ImageItem from './index.vue'
import { ListAlign } from "../align.js";

const NewImageItem = (id) => {
    return {
        image: "mdi mdi-abacus",
        top: 0,
        left: 0,
        style: ListAlign[0],
        id: `img${id}`
    }
};

export {
    ImageItem,
    NewImageItem
}