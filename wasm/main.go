package main

import (
	"fmt"
	"syscall/js"

	"gopkg.in/russross/blackfriday.v2"
)

func updateMD(i []js.Value) {
	input := blackfriday.Run([]byte(i[0].String()))

	fmt.Println("GO:", input)
	js.Global().Get("document").Call("getElementById", i[1].String()).Set("innerHTML", string(input))
}

func registerCallbacks() {
	js.Global().Set("updateMD", js.NewCallback(updateMD))
}

func main() {
	fmt.Println("Hello, wasm")

	c := make(chan struct{}, 0)

	registerCallbacks()

	<-c
}
