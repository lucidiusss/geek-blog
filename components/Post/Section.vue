<template>
  <div v-if="user" class="w-full">
    <div class="p-4">
      <div class="flex flex-row gap-4 items-center">
        <div class="w-[49px] h-[49px]">
          <NuxtImg class="rounded-full" :src="user.user_metadata.avatar_url" />
        </div>
        <div class="w-full">
          <input
            class="w-full bg-transparent outline-none font-medium text-[20px] text-[#5B7083]"
            type="text"
            v-model="text"
            placeholder="What's happening?"
            :disabled="!user"
          />
        </div>
      </div>
      <div class="flex flex-row justify-between items-center">
        <div >
          <input type="file" @input="onChange()" hidden accept=".png, .jpg, .jpeg">
            <Icon
              name="material-symbols:image-outline-rounded"
              color="#1DA1F2"
              size="30"
            />
        </input>
          <button>
            <Icon color="#1DA1F2" size="30" name="material-symbols:gif-box-outline-rounded" />
          </button>
          <button>
            <Icon color="#1DA1F2" size="30" name="iconoir:emoji" />
          </button>

          <button>
            <Icon color="#1DA1F2" size="30" name="material-symbols:calendar-clock-outline" />
          </button>


        </div>
        <div>
          <button @click="createPost()" class="text-white font-bold text-[15px] px-4 py-2 rounded-full bg-[#1DA1F2] ">
            Tweet
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();
let fileDisplay = ref(null)
let text = ref(null)
let file = ref(null)
let fileData = ref(null)


const clearData = async() => {
    fileDisplay.value = null
    text.value = null
    file.value = null
    fileData.value = null
    
}

const onChange = () => {
    fileDisplay.value = URL.createObjectURL(file.value.files[0])
    fileData.value = file.value.files[0]
}


const createPost = async () => {
    let dataOut = null;
    let errorOut = null;


    if (fileData.value) {
        const { data, error } = await client
            .storage
            .from('files')
            .upload(`${uuidv4()}.jpg`, fileData.value)

        dataOut = data;
        errorOut = error;
    }

    if (errorOut) {
        console.log(errorOut)
        return errorOut
    }

    let pic = ''
    if (dataOut) {
        pic = dataOut.path ? dataOut.path : ''
    }

    try {
        await useFetch(`/api/create-post/`, {
            method: 'POST',
            body: {
                userId: user.value.identities[0].user_id,
                username: user.value.identities[0].identity_data.user_name,
                name: user.value.identities[0].identity_data.full_name,
                image: user.value.identities[0].identity_data.avatar_url,
                text: text.value,
                picture: pic,
            }
        })

        clearData()
    } catch (error) {
        console.log(error)
    }
}
</script>
