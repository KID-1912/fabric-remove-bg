<script setup>
const props = defineProps({
  pencil: { type: Object, required: true },
});
const emit = defineEmits(["change-pencil-mode", "change-pencil-radius"]);

const handleChangePencilMode = (mode) => {
  emit("change-pencil-mode", mode);
};

const pencilRadius = ref(props.pencil.radius);
const handleChangePencilRadius = () => {
  console.log("change", pencilRadius.value);
  emit("change-pencil-radius", pencilRadius.value);
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
        擦除
      </div>
      <div
        class="btn-add"
        :class="{ activated: pencil.mode === 'patch' }"
        @click="handleChangePencilMode('patch')"
      >
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
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  width: 17%;
  min-width: 270px;
  padding: 12px 24px;
  .title {
    padding: 4px;
    font-size: 16px;
    font-weight: bold;
    border-bottom: 1px solid #eee;
  }
  .btn-remove,
  .btn-add {
    width: 46%;
    padding: 12px;
    text-align: center;
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
}
</style>
