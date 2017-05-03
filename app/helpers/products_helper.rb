module ProductsHelper
  def available_toggle(record)
    "<div class='inline field'>
    <div class='ui toggle checkbox' data-state='#{record.available}' data-id='#{record.id.to_s}' onclick='javascript: toggle_available(this)'>
      <input type='checkbox' #{'checked' if record.available==true }>
    </div>
  </div>
 "
  end
end
