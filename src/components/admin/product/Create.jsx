import React, { useEffect, useState } from 'react'
import Layout from '../../common/Layout'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../common/Sidebar'
import { set, useForm } from 'react-hook-form'
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';
import { useRef, useMemo } from 'react';
import JoditEditor from 'jodit-react';

const Create = ({ placeholder }) => {

  const [disable, setDisable] = useState(false);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const editor = useRef(null);
  const [content, setContent] = useState('');
  const [gallery, setGallery] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [sizes, setSizes] = useState([]);
   const [sizesChecked, setSizesChecked] = useState([]);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm();

  const config = useMemo(
    () => ({
      readonly: false, // all options from https://xdsoft.net/jodit/docs/,
      placeholder: placeholder || ''
    }),
    [placeholder]
  );

  const saveProduct = async (data) => {
    const formData = { ...data, "description": content, "gallery": gallery };
    try {
      setDisable(true);

      const response = await fetch(`${apiUrl}/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      console.log("HTTP Status:", response.status);
      console.log("API Result:", result);

      setDisable(false);

      if (response.ok && Number(result.status) === 200) {
        toast.success("Product created successfully");
        navigate("/admin/products");
      } else {
        const formErrors = result.errors;
        Object.keys(formErrors).forEach((field) => {
          setError(field, { message: formErrors[field][0] });
        });
      }

    } catch (error) {
      setDisable(false);
      console.error(error);
      toast.error("Server error");
    }

  };

  const fetchCategories = async () => {
    const res = await fetch(`${apiUrl}/categories`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },

    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        setCategories(result.data);
      })

  }
  const fetchBrands = async () => {
    const res = await fetch(`${apiUrl}/brands`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },

    })
      .then(res => res.json())
      .then(result => {
        setBrands(result.data);
      })

  }
 const fetchSizes = async () => {
    const res = await fetch(`${apiUrl}/sizes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },

    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
        setSizes(result.data);
      })

  }
  const handleFile = async (e) => {
    const formData = new FormData();
    const file = e.target.files[0];
    formData.append('image', file);
    setDisable(true);

    const res = await fetch(`${apiUrl}/temp-images`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: formData

    })
      .then(res => res.json())
      .then(result => {
        // console.log(result);
        gallery.push(result.data.id);
        setGallery(gallery);
        galleryImages.push(result.data.image_url);
        setGalleryImages(galleryImages);
        setDisable(false);
        e.target.value = null;
      })
  }

  const deleteImage = (image) => {
   const newGalleryImages = galleryImages.filter( gallery => gallery !== image);
   setGalleryImages(newGalleryImages);

  }
  useEffect(() => {
    fetchCategories();
    fetchSizes();
    fetchBrands();
  }, [])

  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3"> <h4 className="h4 pb-0 mb-0">Product / Create</h4>  <Link to="/admin/products" className='btn btn-primary'>Back</Link> </div>

          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveProduct)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Title</label>
                    <input
                      {
                      ...register("title", { required: "The Title field is required " })
                      }
                      type="text"
                      className={`form-control ${errors.title ? "is-invalid" : ""
                        }`}
                      id="title" placeholder='Title' />
                    {errors.title && (
                      <p className="invalid-feedback">
                        {errors.title.message}
                      </p>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className='form-label'> Category </label>
                        <select
                          {
                          ...register("category", { required: "Please Select a Category " })
                          }
                              id="category"
                          className={`form-control ${errors.category ? "is-invalid" : ""
                            }`}
                        >
                          <option value="">Select a Category</option>

                          {
                            categories && categories.map((category) => {
                              return (
                                <option value={category.id} key={category.id}>
                                  {category.name}
                                </option>
                              )
                            })
                          }
                        </select>
                        {errors.category && (
                          <p className="invalid-feedback">
                            {errors.category.message}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className='form-label'> Brand </label>
                        <select
                          {...register("brand")}
                          className='form-control'
                        >
                          <option value="">Select a Brand</option>
                          {
                            brands && brands.map((brand) => {
                              return (
                                <option value={brand.id} key={brand.id}>
                                  {brand.name}
                                </option>
                              )
                            })
                          }
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className='form-label'> Short Description</label>
                    <textarea
                      {
                      ...register("short_description", { required: "The Short Description field is required " })
                      }
                      className={`form-control ${errors.short_description ? "is-invalid" : ""
                        }`}
                      id="shortDescription" placeholder='Short Description' />
                    {errors.short_description && (
                      <p className="invalid-feedback">
                        {errors.short_description.message}
                      </p>
                    )}
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className='form-lable'> Description</label>
                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons

                    />
                  </div>
                  <h3 className='py-3 border-bottom mb-3'>Pricing</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className='form-label'>Price</label>
                        <input
                          {
                          ...register("price", { required: "The Price field is required! " })
                          }

                          className={`form-control ${errors.price ? "is-invalid" : ""
                            }`}

                          type="text" placeholder='Price' />

                        {errors.price && (
                          <p className="invalid-feedback">
                            {errors.price.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className='form-label'>Compare Price</label>
                        <input
                          {
                          ...register("compare_price")
                          }
                          type="text" placeholder='Compare Price' className='form-control' />
                      </div>
                    </div>
                  </div>
                  <h3 className='py-3 border-bottom mb-3'>Inventory</h3>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className='form-label'>SKU</label>
                        <input
                          {
                          ...register("sku", { required: "The SKU field is required " })
                          }
                          className={`form-control ${errors.sku ? "is-invalid" : ""
                            }`}

                          type="text" placeholder='SKU' />

                        {errors.sku && (
                          <p className="invalid-feedback">
                            {errors.sku.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className='form-label'>BarCode</label>
                        <input

                          {
                          ...register("barcode")
                          }
                          type="text" placeholder='BarCode' className='form-control' />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="" className='form-label'>Quantity</label>
                        <input
                          {
                          ...register("qty")
                          }
                          type="text" placeholder='Quantity' className='form-control' />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label htmlFor="status"
                          className="form-label"
                        >Status</label>
                        <select
                          {
                          ...register("status", { required: "Please select the status " })
                          }
                          className={`form-control ${errors.status ? "is-invalid" : ""
                            }`}
                          id="status">
                          <option value="">Select a Status</option>
                          <option value="1">Active</option>
                          <option value="0">Block</option>
                        </select>
                        {errors.status && (
                          <p className="invalid-feedback">
                            {errors.status.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status"
                      className="form-label"
                    >Featured</label>
                    <select
                      {
                      ...register("is_featured", { required: "Featured fields is required " })
                      }
                      className={`form-control ${errors.is_featured ? "is-invalid" : ""
                        }`}
                      id="is_featured">

                      <option value="1">Yes</option>
                      <option value="0">No</option>
                    </select>
                    {errors.is_featured && (
                      <p className="invalid-feedback">
                        {errors.is_featured.message}
                      </p>
                    )}
                  </div>
                     <h3 className='py-3 border-bottom mb-3'>Sizes</h3>
                  <div className="mb-3">
                    <label htmlFor="sizes"
                      className="form-label"
                    >Size :</label>
                    {
                      sizes && sizes.map((size) => {
                        return (
                          <div className="form-check-inline ps-2" key={`psize-${size.id}`}>
                            <input
                              {
                              ...register("sizes")
                              }
                              checked={sizesChecked.includes(size.id)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSizesChecked([...sizesChecked, size.id]);
                                }
                                else {
                                  setSizesChecked(sizesChecked.filter(sid => size.id != sid));
                                }
                              }}
                              className="form-check-input" type="checkbox" value={size.id} id={`size-${size.id}`} />
                            <label className="form-check-label ps-1" htmlFor={`size-${size.id}`}>
                              {size.name}
                            </label>
                          </div>
                        )
                      })
                    }

                  </div>

                  <h3 className='py-3 border-bottom mb-3'>Gallery</h3>
                  <div className="mb-3">
                    <label htmlFor="" className='form-label'>Image</label>
                    <input
                      onChange={handleFile}
                      type="file" placeholder='Image' className='form-control' />
                  </div>

                  <div className="mb">
                    <div className="row">
                      {
                        galleryImages && galleryImages.map((image, index) => {
                          return (
                            <div className="col-md-3" key={image || index}>
                              <div className="card shadow">
                                <img src={image} alt="" className="w-100" />
                                
                              </div>
                              <button type='button' className="btn btn-danger mt-3 w-100" onClick={() => deleteImage(image)}>Delete</button>
                            </div>
                          )
                        })
                      }

                    </div>
                  </div>
                </div>
              </div>
              <button
                disabled={disable} type="submit" className="btn btn-primary mt-3 mb-5">Create</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
