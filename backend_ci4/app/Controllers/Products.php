<?php

namespace App\Controllers;

use App\Models\ProductModel;
use CodeIgniter\RESTful\ResourceController;
use CodeIgniter\API\ResponseTrait;


class Products extends ResourceController
{
    /**
     * Return an array of resource objects, themselves in array format
     *
     * @return mixed
     */
    use ResponseTrait;

    public function index()
    {
        $model = new ProductModel();
        $data = $model->findAll();
        return $this->respond($data);
    }

    /**
     * Return the properties of a resource object
     *
     * @return mixed
     */
    public function show($id = null)
    {
        $model = new ProductModel();
        $data = $model->where('id', $id)->first();
        if ($data) {
            return $this->respond($data);
        } else {
            return $this->failNotFound('No data found');
        }
    }



    /**
     * Create a new resource object, from "posted" parameters
     *
     * @return mixed
     */
    public function create()
    {
        helper('form');
        $validation =  \Config\Services::validation();
        $model = new ProductModel();

        $rules = [
            'title' => 'required|min_length[8]',
            'price' => 'required|min_length[3]|numeric'
        ];

        $data = [
            'title' => $this->request->getVar('title'),
            'price'  => $this->request->getVar('price'),
        ];

        if (!$this->validate($rules)) {
            return $this->fail($validation->getErrors());
        };

        $model->save($data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Products created successfully'
            ]
        ];
        return $this->respondCreated($response);
    }


    public function update($id = null)
    {
        helper('form');
        $validation =  \Config\Services::validation();
        $model = new ProductModel();

        $rules = [
            'title' => 'required|min_length[8]',
            'price' => 'required|min_length[3]|numeric'
        ];

        $data = [
            'title' => $this->request->getVar('title'),
            'price'  => $this->request->getVar('price'),
        ];

        if (!$this->validate($rules)) {
            return $this->fail($validation->getErrors());
        };
        $findId = $model->where('id', $id)->first();
        if (!$findId) return $this->failNotFound('Data Not Found');

        $model->update($id, $data);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Products Update successfully'
            ]
        ];
        return $this->respondUpdated($response);
    }

    /**
     * Delete the designated resource object from the model
     *
     * @return mixed
     */
    public function delete($id = null)
    {
        $model = new ProductModel();
        $findId = $model->where('id', $id)->first();
        if (!$findId) return $this->failNotFound('Data Not Found');

        $model->delete($id);
        $response = [
            'status'   => 201,
            'error'    => null,
            'messages' => [
                'success' => 'Products Delete successfully'
            ]
        ];
        return $this->respondDeleted($response);
    }
}
