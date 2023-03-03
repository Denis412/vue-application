<template>
  <input
    class="input"
    type="text"
    :value="modelValue"
    @input="emitValue"
    placeholder="Add todo"
  />
</template>

<script>
export default {
  props: {
    modelValue: String,
    modelModifiers: {
      type: Object,
      default: () => ({}),
    },
  },
  emits: ["update:modelValue"],

  setup(props, { emit }) {
    const emitValue = (event) => {
      let value = event.target.value;

      if (props.modelModifiers.capitalize) {
        value = value.charAt(0).toUpperCase() + value.slice(1);
      }

      emit("update:modelValue", value);
    };

    return {
      emitValue,
    };
  },
};
</script>
