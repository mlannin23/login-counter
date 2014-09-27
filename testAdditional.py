import unittest
import os
import testLib

class TestAddUser(testLib.RestTestCase):
    def assertResponse(self, respData, count, errCode = testLib.RestTestCase.SUCCESS):
        expected = { 'errCode' : errCode }
        if count is not None:
            expected['count'] = count
        self.assertDictEqual(expected, respData)

    def testAdd2(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'second-user', 'password': 'second-password' })
        self.assertResponse(respData, 1)

    def testAdd3(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'rpiegjfrek;nwfrjgnrdjkferwflbnewkfuebfuewgfiuwegfiuwefgweiffreflrfelrgberifewfefwewfihfruieofgheirughguhrpgiuerhligjbjwefeisiurghdlsigruhsierughguhrlsglrdgsliuh', 'password' : 'password' })
        self.assertResponse(respData, None, testLib.RestTestCase.ERR_BAD_USERNAME)

    def testAdd4(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : '', 'password' : 'password' })
        self.assertResponse(respData, None, testLib.RestTestCase.ERR_BAD_USERNAME)

    def testAdd5(self):
        respData = self.makeRequest("/users/add", method="POST", data = { 'user' : 'user', 'password' : 'rpiegjfrek;nwfrjgnrdjkferwflbnewkfuebfuewgfiuwegfiuwefgweiffreflrfelrgberifewfefwewfihfruieofgheirughguhrpgiuerhligjbjwefeisiurghdlsigruhsierughguhrlsglrdgsliuh' })
        self.assertResponse(respData, None, testLib.RestTestCase.ERR_BAD_PASSWORD)


class TestLoginUser(testLib.RestTestCase):
    def assertLogin(self, respData, errCode = testLib.RestTestCase.ERR_BAD_CREDENTIALS):
        expected = { 'errCode' : errCode }
        self.assertDictEqual(expected, respData)

    def testLogin1(self):
        respData = self.makeRequest("/users/login", method="POST", data = { 'user' : 'something', 'password' : 'anything' })
        self.assertLogin(respData)


class TestResetFixture(testLib.RestTestCase):
    def assertReset(self, respData, errCode = testLib.RestTestCase.SUCCESS):
        expected = { 'errCode' : errCode }
        self.assertDictEqual(expected, respData)

    def testReset1(self):
        respData = self.makeRequest("/TESTAPI/resetFixture", method="POST")
        self.assertReset(respData);