<template>
  <div class="w-2/6">
    <div class="w-5/6 bg-gray-100 min-h-screen">
      <ul class="pl-12 pr-12 p-7">
        <routerLink to="/">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <InboxSvg />{{ t("message.inbox") }}
          </li>
        </routerLink>
        <routerLink to="/today">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <TodaySvg />{{ t("message.today") }}
          </li>
        </routerLink>
        <routerLink to="/upcoming">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <UpComingSvg />{{ t("message.upComing") }}
          </li>
        </routerLink>
        <hr class="mt-3 mb-3" />
        <li class="mt-3 cursor-pointer">
          <div v-if="this.isArrow == false">
            <div @click="onClick" class="flex items-center">
              <RightArrow class="ml-3 -mb-5 origin-left transform -rotate-90" />
              <div class="tag w-full flex justify-between">
                <p class="font-medium">{{ t("leftBar.labels") }}</p>
                <button class="hidden" @click="onLabelToggle">
                  <AddLabelSvg />
                </button>
              </div>
            </div>
          </div>
          <div v-else>
            <div>
              <div v-if="tagItems">
                <div @click="onCancel" class="flex items-center">
                  <RightArrow class="ml-3 mt-1 mr-2 origin-left transform" />
                  <div class="tag w-full flex justify-between">
                    <p class="font-medium">{{ t("leftBar.labels") }}</p>
                    <button class="hidden" @click="onLabelToggle">
                      <AddLabelSvg />
                    </button>
                  </div>
                </div>
                <div v-for="(tag, index) in tagItems" :key="index">
                  <TagOption :tag="tag" />
                </div>
              </div>
            </div>
          </div>
        </li>

        <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
          <div
            @click="onGroup"
            class="flex items-center"
            v-if="this.isGroupArrow == false"
          >
            <RightArrow class="ml-3 -mb-5 origin-left transform -rotate-90" />
            <div class="tag w-full flex justify-between">
              <p class="font-medium">{{ t("leftBar.groups") }}</p>
              <button class="hidden" @click="onLabelToggle">
                <AddLabelSvg />
              </button>
            </div>
          </div>
          <div @click="onCancelGroup" class="flex items-center" v-else>
            <RightArrow class="ml-3 mt-1 mr-2 origin-left transform" />
            <div class="tag w-full flex justify-between">
              <p class="font-medium">{{ t("leftBar.groups") }}</p>
              <button class="hidden" @click="onLabelToggle">
                <AddLabelSvg />
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <routerView />
  </div>
</template>

<script>
import TagOption from "./TagOption.vue";
import TagMoreSvg from "./icons/TagMoreSvg.vue";
import InboxSvg from "@icons/InboxSvg.vue";
import TodaySvg from "@icons/TodaySvg.vue";
import UpComingSvg from "@icons/UpComingSvg.vue";
import RightArrow from "@icons/RightArrow.vue";
import AddLabelSvg from "@icons/AddLabelSvg.vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { computed, onMounted, watchEffect } from "vue";
import { useQuery } from "villus";
export default {
  name: "Leftbar",
  components: {
    InboxSvg,
    TodaySvg,
    UpComingSvg,
    RightArrow,
    AddLabelSvg,
    TagMoreSvg,
    TagOption,
  },
  data() {
    return {
      isArrow: false,
      isLabelToggle: false,
      isGroupArrow: false,
      tagMore: false,
    };
  },
  methods: {
    onClick() {
      this.isArrow = true;
    },
    onCancel() {
      this.isArrow = false;
    },
    onGroup() {
      this.isGroupArrow = true;
    },
    onCancelGroup() {
      this.isGroupArrow = false;
    },
    onTagMore() {
      this.tagMore = true;
      console.log(this.tagMore);
    },
  },
  setup() {
    const store = useStore();
    const { t } = useI18n();
    const getTags = `
       query{
         tags{
         id
         user_id
         name
         color
         }
     }
     `;

    const { data } = useQuery({
      query: getTags,
    })
      .then((res) => {
        console.log(res.data.value.tags);
        store.dispatch("GET_TAGS", res.data.value.tags);
      })
      .catch((err) => {
        console.log(err);
      });

    watchEffect(() => {
      store.dispatch("GET_TAGS");
    });
    onMounted(() => {
      console.log("component created");
    });

    function onLabelToggle() {
      store.dispatch("GET_TAG_TOGGLE", true);
    }

    const tagItems = computed(() => store.state.tag.tags);

    console.log("tagItems", tagItems);

    return {
      onLabelToggle,
      data,
      tagItems,
      t,
    };
  },
};
</script>

<style scoped>
.tag:hover button {
  display: block;
}

.tag-more-button {
  display: none;
}

.list-menu:hover .tag-more-button {
  display: flex;
  color: rgba(0, 0, 0, 0.5);
}

.tag-more-button:hover {
  color: rgba(0, 0, 0, 0.9) !important;
}
</style>
