<script setup>
import { COLOR_LIST } from "./color.js";
import { BG_IMAGE_LIST } from "./bg-image.js";

const props = defineProps({
  pencil: { type: Object, required: true },
});
const emit = defineEmits(["change-pencil-mode", "change-pencil-radius", "change-background"]);

// 切换画笔：擦除/修补
const handleChangePencilMode = (mode) => {
  emit("change-pencil-mode", mode);
};

// 画笔粗细
const pencilRadius = ref(props.pencil.radius);
const handleChangePencilRadius = () => {
  emit("change-pencil-radius", pencilRadius.value);
};

// 设置背景色
const curColor = ref(null);
const changeColor = (color) => {
  curColor.value = color;
  emit("change-background", { type: "color", color });
};

// 设置背景图
const changeBackgroundImage = (url) => {
  curColor.value = null;
  emit("change-background", { type: "image", url });
};
</script>

<template>
  <div class="sidebar">
    <div class="title">自动抠图</div>
    <div class="flex justify-between mt-12px">
      <div
        class="btn-remove"
        :class="{ activated: pencil.mode === 'remove' }"
        @click="handleChangePencilMode('remove')"
      >
        <mc-eraser-fill class="mr-4px"></mc-eraser-fill>
        擦除
      </div>
      <div
        class="btn-add"
        :class="{ activated: pencil.mode === 'patch' }"
        @click="handleChangePencilMode('patch')"
      >
        <mc-paint-brush-fill class="mr-4px"></mc-paint-brush-fill>
        修补
      </div>
    </div>
    <div class="flex items-center mt-12px">
      <div>笔刷大小</div>
      <input
        v-model.number="pencilRadius"
        class="pencil-radius-input"
        @update:modelValue="handleChangePencilRadius"
      />
    </div>
    <div class="title mt-20px">背景</div>
    <div class="color-list flex flex-wrap justify-between px-12px">
      <div
        v-for="color in COLOR_LIST"
        :key="color"
        class="color-item"
        :class="{ cur: curColor === color, transparent: color === 'transparent' }"
        @click="changeColor(color)"
      >
        <div class="color" :style="{ backgroundColor: color }"></div>
      </div>
    </div>
    <div class="bg-image-list flex flex-wrap justify-between">
      <div
        v-for="bgImage in BG_IMAGE_LIST"
        :key="bgImage"
        class="bg-image-item"
        @click="changeBackgroundImage(bgImage)"
      >
        <img :src="bgImage" class="w-full h-full object-cover" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 17%;
  height: 100%;
  min-width: 270px;
  padding: 12px 24px;
  overflow: auto;
  .title {
    padding: 4px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .btn-remove,
  .btn-add {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46%;
    padding: 12px;
    color: #494f5f;
    border-radius: 6px;
    background-color: rgb(248, 248, 251);
    cursor: pointer;
    &:hover {
      background-color: #f3f4f9;
    }
    &.activated {
      color: #635ff2;
      background-color: #f0effe;
      box-shadow: inset 0 0 0 1px currentColor;
    }
  }
  .pencil-radius-input {
    width: 58px;
    margin-left: auto;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 4px;
    &:focus {
      border-color: #635ff2;
    }
  }
  .color-list {
    .color-item {
      position: relative;
      box-sizing: border-box;
      width: 18%;
      margin-top: 12px;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      cursor: pointer;
      &.transparent {
        .color {
          background: url(data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAHqADAAQAAAABAAAAHgAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8IAEQgAHgAeAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAMCBAEFAAYHCAkKC//EAMMQAAEDAwIEAwQGBAcGBAgGcwECAAMRBBIhBTETIhAGQVEyFGFxIweBIJFCFaFSM7EkYjAWwXLRQ5I0ggjhU0AlYxc18JNzolBEsoPxJlQ2ZJR0wmDShKMYcOInRTdls1V1pJXDhfLTRnaA40dWZrQJChkaKCkqODk6SElKV1hZWmdoaWp3eHl6hoeIiYqQlpeYmZqgpaanqKmqsLW2t7i5usDExcbHyMnK0NTV1tfY2drg5OXm5+jp6vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAQIAAwQFBgcICQoL/8QAwxEAAgIBAwMDAgMFAgUCBASHAQACEQMQEiEEIDFBEwUwIjJRFEAGMyNhQhVxUjSBUCSRoUOxFgdiNVPw0SVgwUThcvEXgmM2cCZFVJInotIICQoYGRooKSo3ODk6RkdISUpVVldYWVpkZWZnaGlqc3R1dnd4eXqAg4SFhoeIiYqQk5SVlpeYmZqgo6SlpqeoqaqwsrO0tba3uLm6wMLDxMXGx8jJytDT1NXW19jZ2uDi4+Tl5ufo6ery8/T19vf4+fr/2wBDAAEBAQEBAQIBAQIDAgICAwQDAwMDBAUEBAQEBAUGBQUFBQUFBgYGBgYGBgYHBwcHBwcICAgICAkJCQkJCQkJCQn/2wBDAQEBAQICAgQCAgQJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQn/2gAMAwEAAhEDEQAAAf0wudZ19Qal1XVLdUtfJu2r/9oACAEBAAEFAnt3+1Dt+jtwdlZXkN5+kdvf6R2/tuP+0/vuP+0/t//aAAgBAxEBPwHs/9oACAECEQE/Aez/2gAIAQEABj8CcH+7E/w9/wBxJ/glxSyxLSlK0kkg0Aq/38f+EH+/j/wh2n/3Wr+D7k/+61fwd//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/Ib/nfH/v+d/1QvufACqpABf87/u/53/f/P8AO+f/AOD/ADvn/wB//9oADAMBAAIRAxEAABBwxQD/xAAzEQEBAQADAAECBQUBAQABAQkBABEhMRBBUWEgcfCRgaGx0cHh8TBAUGBwgJCgsMDQ4P/aAAgBAxEBPxD8H//aAAgBAhEBPxD8H//aAAgBAQABPxD/APDo0Gn6aiPACqoBr/8Al6NGjR//2Q==);
          background-size: 50%;
        }
      }
      &.cur {
        box-shadow: 0 0 0 1px #635ff2;
      }
      .color {
        width: 100%;
        padding: 50%;
      }
    }
  }
  .bg-image-list {
    .bg-image-item {
      width: 48%;
      height: 120px;
      margin-top: 12px;
    }
  }
}
</style>
