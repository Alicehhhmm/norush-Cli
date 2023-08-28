// src/main.js
export default function(): void {
  try {
    import("./foo.js").then(({ default: foo }) => console.log(foo));

  } catch (error: any) {
    console.log(error.message)

  }
}








