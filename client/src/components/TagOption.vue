<template>
  <div v-if="this.isTag == true">
    <div class="w-2/12 -mt-4 -ml-12 absolute bg-white shadow rounded">
      <div @click="onCancel">
        <ul>
          <li class="p-1 pl-2 mt-2 hover:bg-gray-200">
            <button class="text-gray-800 text-left w-full text-sm">
              Üste Etiket Ekle
            </button>
          </li>
          <li class="p-1 pl-2 hover:bg-gray-200">
            <button class="text-gray-800 text-left w-full text-sm">
              Alta Etiket Ekle
            </button>
          </li>
          <hr class="mt-2 mb-2" />
          <li class="p-1 pl-2 hover:bg-gray-200">
            <button class="text-gray-800 text-left w-full text-sm">
              Etiketi Düzenle
            </button>
          </li>
          <li class="p-1 pl-2 hover:bg-gray-200">
            <button class="text-gray-800 text-left w-full text-sm">
              Favorilere Ekle
            </button>
          </li>
          <li class="p-1 pl-2 hover:bg-gray-200">
            <button class="text-gray-800 text-left w-full text-sm">
              Paylaşılan etiketlere taşı
            </button>
          </li>
          <hr class="mt-2 mb-2" />
          <li class="p-1 pl-2 mb-2 hover:bg-gray-200">
            <button
              @click="onDelete(tag)"
              class="text-gray-800 text-left w-full text-sm"
            >
              <TrashSvg class="inline text-gray-500" />Etiketi sil
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div v-else>
    <div>
      <div v-if="tag.color == 'blue'">
        <div class="mt-2">
          <div class="tag-more w-full flex justify-between">
            <div>
              <TagColorSvg class="text-blue-500 inline" />
              <p class="inline">{{ tag.name }}</p>
            </div>
            <div>
              <button @click="onTagMore" class="tag-more-button">
                <TagMoreSvg class="tag-more-svg text-center" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tag.color == 'red'">
        <div class="mt-2">
          <div class="tag-more w-full flex justify-between">
            <div>
              <TagColorSvg class="text-red-500 inline" />
              <p class="inline">{{ tag.name }}</p>
            </div>
            <div>
              <button @click="onTagMore" class="tag-more-button">
                <TagMoreSvg class="tag-more-svg text-center" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-if="tag.color == 'yellow'">
        <div class="mt-2">
          <div class="tag-more w-full flex justify-between">
            <div>
              <TagColorSvg class="text-yellow-500 inline" />
              <p class="inline">{{ tag.name }}</p>
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
import TagModal from "./TagModal.vue";
import TagMoreSvg from "./icons/TagMoreSvg.vue";
import TrashSvg from "./icons/TrashSvg.vue";
import { useMutation } from "villus";
export default {
  name: "TagOption",
  components: {
    TagMoreSvg,
    TrashSvg,
    TagModal,
    TagColorSvg,
  },
  props: {
    tag: Object,
  },
  data() {
    return {
      isTag: false,
    };
  },
  methods: {
    onTagMore() {
      this.isTag = true;
    },
    onCancel() {
      this.isTag = false;
    },
  },
  setup() {
    const deleteTag = `
    mutation deleteTag($input: DeleteTag){
    deleteTag(input: $input){
        user_id
        name
        color
        }
    }
    `;

    const { execute } = useMutation(deleteTag);

    function onDelete(value) {
      console.log(value.id);
      execute({
        input: {
          id: value.id,
        },
      })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    return {
      onDelete,
    };
  },
};
</script>
