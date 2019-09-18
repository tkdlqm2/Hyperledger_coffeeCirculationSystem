/*
 * Copyright IBM Corp All Rights Reserved
 *
 * SPDX-License-Identifier: Apache-2.0
 */

package main

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric/core/chaincode/shim"
	"github.com/hyperledger/fabric/protos/peer"
)

// SimpleAsset implements a simple chaincode to manage an asset
type SimpleAsset struct {
}
type Data struct {
	Key     string `json:"key"`     // 상품 ID
	Value11 string `json:"value11"` // 날짜 등록
	Value12 string `json:"value12"` // 품종
	Value13 string `json:"value13"` // 산지
	Value14 string `json:"value14"` // 수확일
	Value15 string `json:"value15"` // 수량
	Value16 string `json:"value16"` // 생두 등급

	Value17 string `json:"value17"` // 날짜 등록
	Value18 string `json:"value18"` // 상품보관 true or false

	//////////////////////////////////////////////////////////////////////////////// 수입업자
	Value19 string `json:"value19"` // 날짜 등록
	Value20 string `json:"value20"` // 온도
	Value21 string `json:"value21"` // 습도

	Value22 string `json:"value22"` // 날짜 등록
	Value23 string `json:"value23"` // 상품 출발 true or false

	//////////////////////////////////////////////////////////////////////////////// 창고관리자
	Value24 string `json:"value24"` // 날짜 등록
	Value25 string `json:"value25"` // 상품 도착 true or false

	Value26 string `json:"value26"` // 날짜 등록
	Value27 string `json:"value27"` // (로스팅)온도
	Value28 string `json:"value28"` // (로스팅)시간
	Value29 string `json:"value29"` // (로스팅)로스팅 방법
	Value30 string `json:"value30"` // (로스팅)로스팅 1단계
	Value31 string `json:"value31"` // (로스팅)로스팅 2단계
	Value32 string `json:"value32"` // (로스팅)로스팅 3단계
	Value33 string `json:"value33"` // (로스팅)로스팅 4단계
	Value34 string `json:"value34"` // (로스팅)로스팅 5단계
	Value35 string `json:"value35"` // (로스팅)로스팅 6단계
	Value36 string `json:"value36"` // (로스팅)로스팅 7단계
	Value37 string `json:"value37"` // (로스팅)로스팅 8단계

	Value38 string `json:"value38"` // 상품 출발 날짜 등록
	Value39 string `json:"value39"` // 상품 출발 true or false

	//////////////////////////////////////////////////////////////////////////////// 카페 관리자

	Value40 string `json:"value40"` // 날짜 등록 (정기배송센터)
	Value41 string `json:"value41"` // 상품 도착 true or false

	Value42 string `json:"value42"` // 날짜 등록 (정기배송센터 상품 패키징.)
	Value43 string `json:"value43"` // 상품 패키징 true or false

	Value44 string `json:"value44"` // 날짜 등록 (정기배송센터)
	Value45 string `json:"value45"` // 상품 출발 true or false
}

// Init is called during chaincode instantiation to initialize any
// data. Note that chaincode upgrade also calls this function to reset
// or to migrate data.
func (t *SimpleAsset) Init(stub shim.ChaincodeStubInterface) peer.Response {

	return shim.Success(nil)
}

// Invoke is called per transaction on the chaincode. Each transaction is
// either a 'get' or a 'set' on the asset created by Init function. The Set
// method may create a new asset by specifying a new key-value pair.
func (t *SimpleAsset) Invoke(stub shim.ChaincodeStubInterface) peer.Response {
	// Extract the function and args from the transaction proposal
	fn, args := stub.GetFunctionAndParameters()

	var result string
	var err error
	if fn == "set1" {
		result, err = set1(stub, args)
	} else if fn == "set2" {
		result, err = set2(stub, args)
	} else if fn == "set3" {
		result, err = set3(stub, args)
	} else if fn == "set4" {
		result, err = set4(stub, args)
	} else if fn == "set_time5" {
		result, err = set_time5(stub, args)
	} else if fn == "set_time4" {
		result, err = set_time4(stub, args)
	} else if fn == "set_time3" {
		result, err = set_time3(stub, args)
	} else if fn == "set_arr_time" {
		result, err = set_arr_time(stub, args)
	} else if fn == "set_time1" {
		result, err = set_time1(stub, args)
	} else if fn == "set_time2" {
		result, err = set_time2(stub, args)
	} else if fn == "get" {
		result, err = get(stub, args)
	} else if fn == "getAllKeys" {
		result, err = getAllKeys(stub)
	} else {
		return shim.Error("Not supported chaincode function.")
	}

	if err != nil {
		return shim.Error(err.Error())
	}

	// Return the result as success payload
	return shim.Success([]byte(result))
}

// Set stores the asset (both key and value) on the ledger. If the key exists,
// it will override the value with the new one
func set1(stub shim.ChaincodeStubInterface, args []string) (string, error) {
	if len(args) != 7 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	// JSON  변환
	var data = Data{Key: args[0], Value11: args[1], Value12: args[2], Value13: args[3], Value14: args[4], Value15: args[5], Value16: args[6]}
	dataAsBytes, _ := json.Marshal(data)

	err := stub.PutState(args[0], dataAsBytes)
	if err != nil {
		return "", fmt.Errorf("Failed to set asset: %s", args[0])
	}
	return string(dataAsBytes), nil
}
func set_time1(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 3 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value17 = args[1]
	data.Value18 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set2(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 4 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value19 = args[1]
	data.Value20 = args[2]
	data.Value21 = args[3]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set_time2(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 3 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value22 = args[1]
	data.Value23 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

// 로스팅 원두 등록

func set3(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 13 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value26 = args[1]
	data.Value27 = args[2]
	data.Value28 = args[3]
	data.Value29 = args[4]
	data.Value30 = args[5]
	data.Value31 = args[6]
	data.Value32 = args[7]
	data.Value33 = args[8]
	data.Value34 = args[9]
	data.Value35 = args[10]
	data.Value36 = args[11]
	data.Value37 = args[12]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set_time3(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 3 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value38 = args[1]
	data.Value39 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set_arr_time(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 3 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value24 = args[1]
	data.Value25 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set4(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 3 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value40 = args[1]
	data.Value41 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}
func set_time4(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 3 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value42 = args[1]
	data.Value43 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set_time5(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 3 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value44 = args[1]
	data.Value45 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

// Get returns the value of the specified asset key
func get(stub shim.ChaincodeStubInterface, args []string) (string, error) {
	if len(args) != 1 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key")
	}

	value, err := stub.GetState(args[0])
	if err != nil {
		return "", fmt.Errorf("Failed to get asset: %s with error: %s", args[0], err)
	}
	if value == nil {
		return "", fmt.Errorf("Asset not found: %s", args[0])
	}
	return string(value), nil
}

// Get returns the value of the specified asset key
func getAllKeys(stub shim.ChaincodeStubInterface) (string, error) {

	iter, err := stub.GetStateByRange("a", "z")
	if err != nil {
		return "", fmt.Errorf("Failed to get all keys with error: %s", err)
	}
	defer iter.Close()

	var buffer string
	buffer = "["

	comma := false
	for iter.HasNext() {
		res, err := iter.Next()
		if err != nil {
			return "", fmt.Errorf("%s", err)
		}
		if comma == true {
			buffer += ","
		}
		buffer += string(res.Value)

		comma = true
	}
	buffer += "]"

	fmt.Println(buffer)

	return string(buffer), nil
}

// main function starts up the chaincode in the container during instantiate
func main() {
	if err := shim.Start(new(SimpleAsset)); err != nil {
		fmt.Printf("Error starting SimpleAsset chaincode: %s", err)
	}
}
