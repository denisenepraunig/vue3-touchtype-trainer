<template>
  <div id="app">
    <div id="lesson">
      <span v-for="(char, index) in lessonChars" :key="index"
        :class="{ 'current': index === currentPosition, 'correct': index < currentPosition }">
        {{ char }}
      </span>
    </div>
    <div id="feedback">{{ feedback }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const lesson = 'aa ss dd ff jj kk ll ;;'.split('');
const currentPosition = ref(0);
const feedback = ref('Start typing!');

// Convert spaces to non-breaking spaces for display
const lessonChars = lesson.map(char => char === ' ' ? '\u00A0' : char);

function updateFeedback(message) {
  feedback.value = message;
}

onMounted(() => {
  const handleKeydown = (event) => {
    if (currentPosition.value >= lesson.length) return;

    const expectedKey = lesson[currentPosition.value] === '\u00A0' ? ' ' : lesson[currentPosition.value];
    if (event.key === expectedKey) {
      currentPosition.value++;
      updateFeedback('Correct! Keep going...');
      if (currentPosition.value >= lesson.length) {
        updateFeedback('Great job! Lesson complete.');
      }
    } else {
      updateFeedback('Oops! Try again.');
    }
  };

  window.addEventListener('keydown', handleKeydown);

  // Cleanup
  onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
  });
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
}

#lesson span {
  font-size: 24px;
}

.current {
  font-size: 36px;
  color: blue;
  font-weight: bold;
}

.correct {
  color: green;
}
</style>
