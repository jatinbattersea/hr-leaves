import React from 'react';
import PageTitle from '../Components/PageTitle';

const Settings = () => {
  return (
    <main id="main" class="main">
      <PageTitle />
      <div class="col-lg-12">
        <h5 class="mb-1"> Modules Name</h5>
        <div class="row align-items-center">
          <div class="col-lg-3">
            <div class="me-4"> All Employees </div>
          </div>
          <div class="col-lg-6">
            <form action="#" method="post">
              <select class="form-select" id="choices-multiple-remove-button" placeholder="Select Users For Permisson" multiple required>
                <option value="Administrator">Administrator</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Senior Web Developer">Senior Web Developer</option>
                <option value="Senior Web Designer">Senior Web Designer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="SEO Executive">Senior SEO Executive</option>
                <option value="SEO Executive">SEO Executive</option>
                <option value="Senior Content Writer">Senior Content Writer</option>
                <option value="Content Writer">Content Writer</option>
              </select>
            </form>
          </div>
        </div>
        <div class="row align-items-center mt-2">
          <div class="col-lg-3">
            <div class="me-4"> Holidays </div>
          </div>
          <div class="col-lg-6">
            <form action="#" method="post">
              <select class="form-select" id="choices-multiple-remove-button" placeholder="Select Users For Permisson" multiple required>
                <option value="Administrator">Administrator</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Senior Web Developer">Senior Web Developer</option>
                <option value="Senior Web Designer">Senior Web Designer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="SEO Executive">Senior SEO Executive</option>
                <option value="SEO Executive">SEO Executive</option>
                <option value="Senior Content Writer">Senior Content Writer</option>
                <option value="Content Writer">Content Writer</option>
              </select>
            </form>
          </div>
        </div>
        <div class="row align-items-center mt-2">
          <div class="col-lg-3">
            <div class="me-4"> Teams </div>
          </div>
          <div class="col-lg-6">
            <form action="#" method="post">
              <select class="form-select" id="choices-multiple-remove-button" placeholder="Select Users For Permisson" multiple required>
                <option value="Administrator">Administrator</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Senior Web Developer">Senior Web Developer</option>
                <option value="Senior Web Designer">Senior Web Designer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="SEO Executive">Senior SEO Executive</option>
                <option value="SEO Executive">SEO Executive</option>
                <option value="Senior Content Writer">Senior Content Writer</option>
                <option value="Content Writer">Content Writer</option>
              </select>
            </form>
          </div>
        </div>
        <div class="row align-items-center mt-2">
          <div class="col-lg-3">
            <div class="me-4"> Attendance </div>
          </div>
          <div class="col-lg-6">
            <form action="#" method="post">
              <select class="form-select" id="choices-multiple-remove-button" placeholder="Select Users For Permisson" multiple required>
                <option value="Administrator">Administrator</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Senior Web Developer">Senior Web Developer</option>
                <option value="Senior Web Designer">Senior Web Designer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="SEO Executive">Senior SEO Executive</option>
                <option value="SEO Executive">SEO Executive</option>
                <option value="Senior Content Writer">Senior Content Writer</option>
                <option value="Content Writer">Content Writer</option>
              </select>
            </form>
          </div>
        </div>
        <div class="row align-items-center mt-2">
          <div class="col-lg-3">
            <div class="me-4"> Settings </div>
          </div>
          <div class="col-lg-6">
            <form action="#" method="post">
              <select class="form-select" id="choices-multiple-remove-button" placeholder="Select Users For Permisson" multiple required>
                <option value="Administrator">Administrator</option>
                <option value="Team Leader">Team Leader</option>
                <option value="Senior Web Developer">Senior Web Developer</option>
                <option value="Senior Web Designer">Senior Web Designer</option>
                <option value="Web Designer">Web Designer</option>
                <option value="SEO Executive">Senior SEO Executive</option>
                <option value="SEO Executive">SEO Executive</option>
                <option value="Senior Content Writer">Senior Content Writer</option>
                <option value="Content Writer">Content Writer</option>
              </select>
            </form>
          </div>
        </div>
      </div>
      <div class="modal fade" id="modalDialogScrollable">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Add Role</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
              <form action="#" method="post" sclass="row g-3">
                <div class="col-lg-12 mt-4">
                  <label for="" class="mb-3">Role Name *</label>
                  <input type="text" class="form-control" required />
                </div>
                <div class="modal-footer justify-content-center">
                  <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="modalDialogScrollable-setting">
        <div class="modal-dialog modal-md modal-dialog-scrollable">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title">Edit Role</h4>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body text-start">
              <form action="#" method="post" sclass="row g-3">
                <div class="col-lg-12 mt-4">
                  <label for="" class="mb-3">Role Name *</label>
                  <input type="text" class="form-control" value="Team Leader" required />
                </div>
                <div class="modal-footer justify-content-center">
                  <button type="submit" name="submit" class="btn btn-primary">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Settings;