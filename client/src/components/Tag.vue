<template>
  <div>
    <div v-for="(item, index) in messages" :key="index">
      <div v-if="item.newTag.color == 'blue'">
        <div class="mt-2">
          <div class="tag-more w-full flex justify-between">
            <div>
              <TagColorSvg class="text-blue-500 inline" />
              <p class="inline">{{ item.newTag.name }}</p>
            </div>
            <div>
              <button @click="onTagMore" class="tag-more-button">
                <TagMoreSvg class="tag-more-svg text-center" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.newTag.color == 'red'">
        <div class="mt-2">
          <div class="tag-more w-full flex justify-between">
            <div>
              <TagColorSvg class="text-red-500 inline" />
              <p class="inline">{{ item.newTag.name }}</p>
            </div>
            <div>
              <button @click="onTagMore" class="tag-more-button">
                <TagMoreSvg class="tag-more-svg text-center" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="item.newTag.color == 'yellow'">
        <div class="mt-2">
          <div class="tag-more w-full flex justify-between">
            <div>
              <TagColorSvg class="text-yellow-500 inline" />
              <p class="inline">{{ item.newTag.name }}</p>
            </div>
            <div>
              <button @click="onTagMore" class="tag-more-button">
                <TagMoreSvg class="tag-more-svg text-center" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TagColorSvg from "./icons/TagColorSvg.vue";
import TagMoreSvg from "./icons/TagMoreSvg.vue";
import { ref, watch } from "vue";
import { useSubscription } from "villus";
export default {
  name: "Tag",
  components: {
    TagColorSvg,
    TagMoreSvg,
  },
  setup() {
    const messages = ref([]);
    const newTag = `
    subscription{
      newTag{
        id
        user_id
        name
        color
      }
    }
    `;

    const { data } = useSubscription({ query: newTag });

    watch(data, (incoming) => {
      // do stuff with incoming data
      messages.value.push(incoming);
    });

    return {
      messages,
    };
  },
};
</script>
