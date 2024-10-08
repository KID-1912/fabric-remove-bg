<script setup>
const props = defineProps({
  canNext: { type: Boolean, required: true },
  canPrev: { type: Boolean, required: true },
});
const emit = defineEmits(["changeHistoryStep"]);

const onChangeHistoryStep = (type, can) => {
  emit("changeHistoryStep", type, can);
};
</script>

<template>
  <div class="flex p-10px">
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
</style>
