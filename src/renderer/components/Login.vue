<template>
<div class="content">
  <Card :bordered="false" class="content-card">
    <p slot="title">Connexion</p>
    <p>
  <Form ref="formInline" :model="formInline" :rules="ruleInline" >
    <FormItem prop="user">
      <Input type="text" v-model="formInline.user" placeholder="Username">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="formInline.password" placeholder="Password">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleSubmit('formInline')">Connexion</Button>
    </FormItem>
  </Form>
    </p>
  </Card>
</div>
</template>
<script>
  export default {
    data() {
      return {
        formInline: {
          user: '',
          password: ''
        },
        ruleInline: {
          user: [
            { required: true, message: 'the username is required', trigger: 'blur' }
          ],
          password: [
            { required: true, message: 'the password is required', trigger: 'blur' },
            { type: 'string', min: 6, message: 'With 6 character', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      handleSubmit(name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$store.dispatch('login', {
              email: this.formInline.user,
              password: this.formInline.password
            }).then(() => {
              this.$router.push('/');
            });
          }
        });
      }
    }
  };
</script>

<style>
.content-card {
  width: 300px;
  height: 230px;
  background-color: #eee;

  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
}
.content:before {
    content: "";
    position: fixed;
    left: 0;
    right: 0;
    z-index: -1;
    display: block;
    background-image: url('https://i.ytimg.com/vi/ew0vhOSFL24/maxresdefault.jpg');
    width: 1900px;
    height: 1200px;
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
}

.content {
  position: fixed;
  height: 100vh;
  left: 0;
  right: 0;
  z-index: 0;
}
</style>
