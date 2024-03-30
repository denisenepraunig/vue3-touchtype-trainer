<template>
  <div class="text-center">
    <h1 class="text-3xl font-bold">
      Touch Type Trainer
    </h1>
    <div id="lesson" class=" text-3xl m-4 font-mono h-[2em] align-text-bottom">
      <span v-for="(char, index) in lessonChars" :key="index" :class="getClassObject(index)">
        {{ char }}
      </span>
    </div>
    <div class="grid grid-cols-2 gap-2 m-4 font-mono">
      <div class=" text-end">
        Hint:
      </div>
      <div class=" text-start">
        {{ hint }}
      </div>
    </div>
    <div id="feedback" class="text-primary">{{ feedback }}</div>
    <div id="restart">
      <button class="btn btn-accent p-2 my-2" @click="restartLesson">
        Restart Lesson
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const lesson = 'aa ss dd ff jj kk ll ;;'.split('');
const currentPosition = ref(0);
const feedback = ref('Start typing to begin...');
const incorrectIndexes = ref([]);
const hint = ref(lesson[0]);

// Convert spaces to non-breaking spaces for display
const lessonChars = lesson.map(char => char === ' ' ? '\u00A0' : char);

function updateFeedback(message) {
  feedback.value = message;
}

function restartLesson() {
  currentPosition.value = 0;
  incorrectIndexes.value = [];
  updateFeedback('Start typing to begin...');
  hint.value = lesson[0];
}

const getClassObject = (index) => ({
  'current': index === currentPosition.value,
  'correct': index < currentPosition.value && !incorrectIndexes.value.includes(index),
  'incorrect': incorrectIndexes.value.includes(index),
});


onMounted(() => {
  const handleKeydown = (event) => {
    if (currentPosition.value >= lesson.length) return;

    const expectedKey = lesson[currentPosition.value] === '\u00A0' ? ' ' : lesson[currentPosition.value];
    if (event.key === expectedKey) {
      incorrectIndexes.value = incorrectIndexes.value.filter(index => index !== currentPosition.value); // Remove from incorrect if it was previously incorrect
      currentPosition.value++;
      // give a hint what to type
      hint.value = lesson[currentPosition.value] === ' ' ? 'Space' : lesson[currentPosition.value];

      updateFeedback('Correct! Keep going...');
      if (currentPosition.value >= lesson.length) {
        updateFeedback('Great job! Lesson complete.');
        hint.value = '٩(＾◡＾)۶!';
      }
    } else {
      if (!incorrectIndexes.value.includes(currentPosition.value)) {
        incorrectIndexes.value.push(currentPosition.value);
      }
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
.current {
  @apply text-5xl text-info font-bold;
  /* This applies a font-size of 36px, blue color, and bold font weight */
}

.correct {
  @apply text-3xl text-success font-bold;
  /* This applies a medium font-size, green color, and bold font weight */
}

.incorrect {
  @apply text-5xl text-error font-bold;
  /* This applies a font-size of 36px, red color, and bold font weight */
}
</style>
