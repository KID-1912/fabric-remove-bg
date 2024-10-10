<script setup>
import { createObjectURL } from "blob-util";

const props = defineProps({
  canNext: { type: Boolean, required: true },
  canPrev: { type: Boolean, required: true },
});
const emit = defineEmits(["changeHistoryStep", "changeFromImageURL", "exportRemoveBgImage"]);

const onChangeHistoryStep = (type, can) => {
  emit("changeHistoryStep", type, can);
};
const onChangeFromImage = async (event) => {
  const file = event.target.files[0];
  const imageURL = createObjectURL(file);
  emit("changeFromImageURL", imageURL);
};
const onExportRemoveBgImage = () => {
  emit("exportRemoveBgImage");
};
</script>

<template>
  <div class="flex justify-between items-center p-10px">
    <div class="opt-steps-box flex">
      <div
        class="btn flex items-center"
        :class="{ disabled: !canPrev }"
        @click="onChangeHistoryStep(-1, canPrev)"
      >
        <mc-back-fill class="icon"></mc-back-fill>
        <div>上一步</div>
      </div>
      <div
        class="btn flex items-center"
        :class="{ disabled: !canNext }"
        @click="onChangeHistoryStep(1, canNext)"
      >
        <mc-forward-fill class="icon"></mc-forward-fill>
        <div>下一步</div>
      </div>
      <div
        class="btn flex items-center"
        :class="{ disabled: !canPrev && !canNext }"
        @click="onChangeHistoryStep(0, canPrev || canNext)"
      >
        <div>重做</div>
      </div>
    </div>
    <div>
      <input type="file" accept=".png, .jpg, .jpeg" class="w-200px" @change="onChangeFromImage" />
      <button type="button" class="btn-download" @click="onExportRemoveBgImage">导出图片</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.opt-steps-box {
  .btn {
    cursor: pointer;
    padding: 5px 10px;
    border-radius: 3px;
    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
    }
    &.disabled {
      background-color: transparent;
      color: #ccc;
    }
  }
}
.btn-download {
  padding: 4px 12px;
  color: #635ff2;
  border-radius: 4px;
  background-color: #f0effe;
  box-shadow: inset 0 0 0 1px currentColor;
}
</style>
