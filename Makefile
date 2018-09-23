CC=go build
OUTDIR=./dist
PUBDIR=./public
WASM_OUT=wasm/lib.wasm
WASM_PROJ_DIR=./wasm
WASM_SRC_FILES=main.go
SERVER_OUT=server
SERVER_PROJ_DIR=./server
SERVER_SEC_FILES=main.go

run: build-all
	./${OUTDIR}/${SERVER_OUT}

build-all: build-wasm build-server

build-server:
	${CC} -o ${OUTDIR}/${SERVER_OUT} ${SERVER_PROJ_DIR}/${SERVER_SRC_FILES}

build-wasm:
	GOARCH=wasm GOOS=js ${CC} -o ${OUTDIR}/${WASM_OUT} ${WASM_PROJ_DIR}/${WASM_SRC_FILES}
