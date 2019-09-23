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

// 관리자 회원 정보 속성
type profile struct {
	ID         string `json:"key"`
	Name       string `json:"v100"`
	Number     string `json:"101"`
	Address    string `json:"102"`
	Store_name string `json:"103"`
	Job        string `json:"104"`
}

type Data struct {
	Key      string `json:"key"` // 상품 ID
	Value11  string `json:"v11"` // 날짜 등록
	Value12  string `json:"v12"` // 품종
	Value13  string `json:"v13"` // 산지
	Value14  string `json:"v14"` // 수확일
	Value15  string `json:"v15"` // 수량
	Value16  string `json:"v16"` // 생두 등급
	Value18  string `json:"v17"` // 생두 등급
	Value100 string `json:"v18"` // 목적지 등록

	Value177 string `json:"v19"` // 날짜 등록
	// 보관할 주소 추가.
	//////////////////////////////////////////////////////////////////////////////// 수입업자
	Value19 string `json:"v20"` // 날짜 등록
	Value20 string `json:"v21"` // 온도
	Value21 string `json:"v22"` // 습도

	Value222 string `json:"v23"` // 날짜 등록
	Value101 string `json:"v24"` // 날짜 등록 (정기배송센터)

	Value23 string `json:"v25"` //

	// 출발할 주소 추가 ex) 땡떙 커피 1호점, 2호점 등
	//////////////////////////////////////////////////////////////////////////////// 창고관리자

	Value25 string `json:"v26"` // (로스팅)로스팅 시간
	Value26 string `json:"v27"` //로스팅 단계 등록

	Value201 string `json:"v28"` //ㅇ
	Value202 string `json:"v29"` //ㅇ
	Value203 string `json:"v30"` // ㅇ
	Value204 string `json:"v31"` // ㅇ
	Value205 string `json:"v32"` // ㅇ
	Value206 string `json:"v33"` // ㅇ
	Value207 string `json:"v34"` // ㅇ
	Value208 string `json:"v35"` // ㅇ

	Value40  string `json:"v36"` // 상품 출발 날짜 등록
	Value102 string `json:"v37"` // 날짜 등록 (정기배송센터)
	//////////////////////////////////////////////////////////////////////////////// 카페 관리자

	Value27 string `json:"v38"` // 날짜 등록 (정기배송센터)
	Value28 string `json:"v39"` // 날짜 등록 (정기배송센터 상품 패키징.)
	Value29 string `json:"v40"` // 날짜 등록 (정기배송센터)
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
	} else if fn == "enroll_user" {
		result, err = enroll_user(stub, args)
	} else if fn == "update_user_Info" {
		result, err = update_user_Info(stub, args)
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

// ID         string `json:"key"`
// Name       string `json:"v100"`
// Number     string `json:"101"`
// Address    string `json:"102"`
// Store_name string `json:"103"`
// Job        string `json:"104"`

// 회원정보 등록
func enroll_user(stub shim.ChaincodeStubInterface, args []string) (string, error) {
	if len(args) != 6 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	// JSON  변환
	var profile = profile{ID: args[0], Name: args[1], Number: args[2], Address: args[3], Store_name: args[4], Job: args[5]}
	dataAsBytes, _ := json.Marshal(profile)

	err := stub.PutState(args[0], dataAsBytes)
	if err != nil {
		return "", fmt.Errorf("Failed to set asset: %s", args[0])
	}
	return string(dataAsBytes), nil
}

// 회원 정보 수정
func update_user_Info(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 7 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	Profile := profile{}

	json.Unmarshal(InfoAsBytes, &Profile)
	Profile.ID = args[1]
	Profile.Name = args[2]
	Profile.Number = args[3]
	Profile.Address = args[4]
	Profile.Store_name = args[5]
	Profile.Job = args[6]

	InfoAsBytes, _ = json.Marshal(Profile)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

// Set stores the asset (both key and value) on the ledger. If the key exists,
// it will override the value with the new one
func set1(stub shim.ChaincodeStubInterface, args []string) (string, error) {
	if len(args) != 8 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	// JSON  변환
	var data = Data{Key: args[0], Value11: args[1], Value12: args[2], Value13: args[3], Value14: args[4], Value15: args[5], Value16: args[6], Value18: args[7]}
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
	data.Value177 = args[1]
	data.Value100 = args[2]

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
	data.Value222 = args[1]
	data.Value101 = args[2]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

// 로스팅 원두 등록

func set3(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 11 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value25 = args[1]
	data.Value26 = args[2]

	data.Value201 = args[3]
	data.Value202 = args[4]
	data.Value203 = args[5]
	data.Value204 = args[6]
	data.Value205 = args[7]
	data.Value206 = args[8]
	data.Value207 = args[9]
	data.Value208 = args[10]

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
	data.Value40 = args[1]
	data.Value102 = args[2]
	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set_arr_time(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 2 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value23 = args[1]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set4(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 2 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value27 = args[1]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}
func set_time4(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 2 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value28 = args[1]

	InfoAsBytes, _ = json.Marshal(data)
	APIstub.PutState(args[0], InfoAsBytes)

	return string(InfoAsBytes), nil
}

func set_time5(APIstub shim.ChaincodeStubInterface, args []string) (string, error) {

	if len(args) != 2 {
		return "", fmt.Errorf("Incorrect arguments. Expecting a key and a value")
	}

	InfoAsBytes, _ := APIstub.GetState(args[0])
	data := Data{}

	json.Unmarshal(InfoAsBytes, &data)
	data.Value29 = args[1]

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

	iter, err := stub.GetStateByRange("1", "9999")
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
