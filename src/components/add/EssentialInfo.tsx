import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Select, Link, TextField,
  Typography, Checkbox, FormControlLabel, InputLabel, MenuItem } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AddImage from './AddImage';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
// import { CustomSelect } from '../dashboard/CustomSelect';
import UploadVideo from './UploadVideo';
// import { Facebook as FacebookIcon } from '../icons/facebook';
// import { Google as GoogleIcon } from '../icons/google'; 

  const Index = ({setDisabled}:{setDisabled:any}) => {
    const [imgs, setImgs] = useState([''])

    const [itemToEDIT,setItemToEdit]= useState<any>({})
    const [init,setInit]= useState({
      title: '',
      price : '',
      weight: '',
      description:'',
      isFeatured : false,
      videoUrl : '',
      category : 'Burnshield',
      // inStock: false,
      // Manufacturer
      // additionalInfo:'',
      // password: 'Password123'
      })
    const [load,setLoad]= useState<any>(false)
    const [videoUrl,setUrl]= useState<any>('')
    console.log('init: ', init);


    const router = useRouter()
    const mode = router.query.mode;
    const id = router.query.id;


    const getItem = async () => {
      try {

    const req= await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/getbyid?pid=${id}`)
    const res = await req.json()
    console.log('res: ', res);
    if (res) {

      setItemToEdit(res)
      setLoad(false)
      // init.title = res.title;
      setInit({
        ...init,
        title: res.title,
        description: res.description,
        price: res.price,
        videoUrl : res?.videoUrl || '',
        category: res.category,
        isFeatured: res.isFeatured,
        weight: res?.weight,
      })
      setUrl(res?.videoUrl);
      setImgs(res.images)
      // return res
    }
    setLoad(false)

  }
  catch(e){
    setLoad(false)

    console.log('e: ', e);

  }
    }
    useEffect(() => {
      if(!router.isReady || !id) return;
      if (mode === 'edit' && id) {
        setLoad(true)
        getItem()
      }
    },[mode])
  const handleImgChange = (url:string[] | any) => {
    if (url) {

      setImgs(url);

      // saveState({
      //   ...state,
      //   images: [...imgs] || url
      // })
    }
  }

const resetForm = () => { 
  setInit({ title: '',
  price : '',
  weight: '',
  description:'',
  isFeatured : false,
  videoUrl : '',
  category : 'Burnshield'})
  setUrl('')
}
// console.log('init: ', init);
const onSubmit = async (e:any)=>{
  e.preventDefault();
  setDisabled(true)
  const tkn = localStorage.getItem('tkn');
  if (!tkn ) {
    setDisabled(false)
    return
  };
  // saveState(values)
//   saveState({
  //     ...values,
//     images: [...imgs]
// });

const req = await fetch(`${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/api/${id && mode === 'edit' ? `update?pid=${id}`: `save`}`,{
  method: 'POST',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },

  body: JSON.stringify({state:{...init,videoUrl,images:imgs}})
})

// console.log('state: ', state);
const res = await req.json()
console.log('res: ', res);
if (res?.success) {


    resetForm();
     setDisabled(false)
  if (mode === 'edit') {
    router.push('/add');
  }
    // setSubmitting(false)
 

    router.push('/products')

    return
}
setDisabled(false)

// setSubmitting(false)

}
// const formik = useFormik({
//       // initialValues: init,

//     validationSchema: Yup.object({
//         title: Yup
//         .string()
//         // .email('Must be a valid email')
//         .max(255)
//         .required('Title is required'),
//         price : Yup.number().max(10000000).min(0.1).required('Price is required'),
//         description : Yup.string().max(122525).min(1).required('Description is required'),
//         category : Yup.string().max(255).min(2).required('Category is required'),
//         weight : Yup.string().max(255).min(1),
//         isFeatured : Yup.boolean(),



//         // password: Yup
//       //   .string()
//       //   .max(255)
//       //   .required('Password is required')
//     }),

//     // validate:(e) => {(console.log('e: ', e))}

//   });
  const handleChange = async (e:any) => {
    let val = e.target.value
    if (val !== null) {
      setInit({...init,
      [e.target.name]: val
    })
    }
  }




  return (
    <>

      <Box
        component="main"
      className='essential'
        sx={{
          maxWidth:'sm'
          // alignItems: 'center',
          // display: 'flex',
          // flexGrow: 1,
          // minHeight: '100%'
        }}
      >
        {/* <Container maxWidth='sm' > */}
     {!load &&   <UploadVideo videoUrl={videoUrl} setUrl={setUrl}/>}
       {!load &&   <form id='add-form' onSubmit={onSubmit}>


            <TextField
            required
              // error={Boolean(formik.touched.title && formik.errors.title)}
              fullWidth
              // helperText={formik.touched.title && formik.errors.title}
              label="Title*"
              margin="normal"
              name="title"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="text"
              // defaultValue={itemToEDIT.title}
              value={init.title}
              variant="filled"
            />
                        <TextField
            required

              // error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              // helperText={formik.touched.price && 'Price should be at least 0.1 '}
              label="Price* in $"
              margin="normal"
              name="price"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="number"
              value={init.price}
              variant="filled"
            />
            <TextField
              // error={Boolean(formik.touched.price && formik.errors.price)}
              fullWidth
              multiline
              required

              rows={4}
              // helperText={formik.touched.description && formik.errors.description}
              label="Description*"
              margin="normal"
              name="description"
              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="text"
              value={init.description}
              variant="filled"
            />
              {/* <TextField
              // error={Boolean(formik.touched.category && formik.errors.category)}
              fullWidth
              // helperText={formik.touched.category && formik.errors.category}
              label="Category* | ex: microwaves, kitchen.. "
              margin="normal"
              name="category"
              required

              // onBlur={formik.handleBlur}
              onChange={handleChange}
              type="text"
              value={`${init.category ? init.category.toLocaleLowerCase() : ''}`}
              variant="filled"
            /> */}
            {/* <CustomSelect
              onChange={(val:any)=>console.log('hi',val)}
            /> */}
            <>
  <InputLabel id="demo-simple-select-label">Category</InputLabel>
  <Select
  variant='filled'
    labelId="demo-simple-select-label"
    id="demo-simple-select"
     name='category'
    value={init.category.toLocaleLowerCase()}
    label="Category"
    fullWidth
    defaultValue={'Burnshield'}
    onChange={handleChange}
  >
    <MenuItem  value={'Burnshield'}>Burnshield</MenuItem>
    {['E.M.S','Pharmacy','Laboratory' ,'Oxygen' ,'Boonfeet' ,'Orthopedics','Sterilisation','Dental'].map((item:string) =>{

return    <MenuItem
key={item}
value={item}>{item}</MenuItem>
    })}
  </Select>
  </>


 
            <FormControlLabel
            // helperText={formik.touched.isFeatured && formik.errors.isFeatured}
            label="Show On Homepage?"
            // error={Boolean(formik.touched.isFeatured && formik.errors.isFeatured)}
            name="isFeatured"
            // onBlur={formik.handleBlur}
            onChange={handleChange}
            checked={init.isFeatured}
            control={<Checkbox
            // margin="normal"
            // fullWidth
            value={init.isFeatured}  />}  />



            {/* <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            /> */}
              <AddImage   HandleImagesChange={handleImgChange}/>
              {mode === 'edit' && <Typography>Note: adding new images might replace the old ones</Typography>}
          </form>}
        {/* </Container> */}

      </Box>
    </>
  );
};

export default Index;
