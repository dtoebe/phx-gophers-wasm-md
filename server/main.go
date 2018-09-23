package main

import (
	"flag"
	"log"
	"net"
	"net/http"
)

func main() {
	var (
		port string
	)

	flag.StringVar(&port, "port", "3030", "port the server listens on")

	flag.Parse()

	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.Handle("/static/",
		http.StripPrefix("/static", http.FileServer(http.Dir("./static"))),
	)
	http.Handle("/wasm/",
		http.StripPrefix("/wasm", http.FileServer(http.Dir("./dist/wasm"))),
	)

	log.Printf("listening on: http://localhost:%s\n", port)
	log.Fatal(http.ListenAndServe(
		net.JoinHostPort("", port),
		nil,
	))
}
