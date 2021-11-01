<template>
  <div class="w-2/6">
    <div class="w-5/6 bg-gray-100 h-screen">
      <ul class="pl-12 pr-12 p-7">
        <router-link to="/">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <InboxSvg />{{ t("message.inbox") }}
          </li>
        </router-link>
        <router-link to="/today">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <TodaySvg />{{ t("message.today") }}
          </li>
        </router-link>
        <router-link to="/upcoming">
          <li class="mt-3 hover:bg-gray-300 rounded cursor-pointer">
            <UpComingSvg />{{ t("message.upComing") }}
          </li>
        </router-link>
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
              <div v-if="data">
                <div @click="onCancel" class="flex items-center">
                  <RightArrow class="ml-3 mt-1 mr-2 origin-left transform" />
                  <div class="tag w-full flex justify-between">
                    <p class="font-medium">{{ t("leftBar.labels") }}</p>
                    <button class="hidden" @click="onLabelToggle">
                      <AddLabelSvg />
                    </button>
                  </div>
                </div>
                <div v-for="(tag, index) in data.tags" :key="index">
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
    <router-view />
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
    const { t } = useI18n();
    const store = useStore();
    function onLabelToggle() {
      store.dispatch("GET_TAG_TOGGLE", true);
    }

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
    });

    console.log(data);

    return {
      onLabelToggle,
      data,
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
