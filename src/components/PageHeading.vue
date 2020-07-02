<template functional>
  <div class="d-flex justify-space-between align-center mx-2 mb-2">
    <div class="title">
      <strong><slot></slot></strong>
    </div>
    <div class="text-end">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script>
export default {};
</script>